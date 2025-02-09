const express = require('express');
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ฟังก์ชันคำนวณสินเชื่อ
app.post('/calculate_loan', (req, res) => {
    const housePrice = parseFloat(req.body.house_price);
    const salary = parseFloat(req.body.salary);
    const downPaymentPercent = parseFloat(req.body.down_payment);
    const years = parseInt(req.body.years);
    const interestType = req.body.interest_type;
    const fixedInterest = parseFloat(req.body.fixed_interest);
    const variableRates = req.body.variable_rate ? req.body.variable_rate.split(',').map(rate => parseFloat(rate)) : [];

    // คำนวณเงินกู้และยอดคงเหลือ
    const downPayment = (housePrice * downPaymentPercent) / 100;
    const loanAmount = housePrice - downPayment;
    let monthlyPayment = loanAmount / (years * 12); // สมมุติการคำนวณเบื้องต้น

    // สร้างตารางการผ่อน
    const paymentSchedule = [];
    let remainingBalance = loanAmount;
    let interestPaid = 0;
    for (let year = 1; year <= years; year++) {
        let interest = interestType === 'fixed' ? fixedInterest : variableRates[year - 1] || fixedInterest;
        interestPaid += (remainingBalance * interest) / 100;
        remainingBalance -= monthlyPayment * 12;
        paymentSchedule.push({
            year,
            remaining_balance: remainingBalance,
            interest_paid: interestPaid,
            monthly_payment: monthlyPayment
        });
    }

    // ส่งข้อมูลกลับ
    res.json({
        loan_amount: loanAmount,
        down_payment: downPayment,
        monthly_payment: monthlyPayment,
        monthly_balance: salary - monthlyPayment,
        payment_schedule: paymentSchedule
    });
});

// เริ่มเซิร์ฟเวอร์
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
