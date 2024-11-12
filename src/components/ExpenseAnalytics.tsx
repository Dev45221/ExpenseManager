import React from 'react';
import { View } from 'react-native';
import { VictoryPie } from 'victory-native';


//@ts-ignore
const ExpenseAnalytics = ({ expenses }) => {
    //@ts-ignore
    const categoryData = expenses.reduce((acc, expense) => {
        acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
        return acc;
    }, {});
    const chartData = Object.entries(categoryData).map(([category, amount]) => ({
        x: category,
        y: amount,
    }));

    return (
        <View>
            <VictoryPie
                data={chartData}
                width={350}
                height={350}
                colorScale="qualitative"
            />
        </View>
    );
};

export default ExpenseAnalytics
