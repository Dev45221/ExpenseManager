import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import DeleteExpense from './DeleteExpense';
import { useNavigation } from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

//@ts-ignore
const ExpenseItem = ({ index, item, amount, category, date, note }) => {
	const navigation = useNavigation();
	return (
		<View style={Styling.container} >
			<View style={Styling.container2} >
				<Text style={Styling.amount}>${amount}</Text>
				<Text style={Styling.category}>{category}</Text>
				<Text style={Styling.date}>{date}</Text>
				{
					note ?
						<Text style={Styling.date}>Note: {note}</Text>
						: null
				}
			</View>
			<View style={Styling.container3} >
				<TouchableOpacity
					activeOpacity={0.6}
					onPress={()=> {
						//@ts-ignore
						navigation.navigate('Edit Expense', { item: item, index: index });
					}}
				>
					<MaterialIcons name={'edit'} color={'green'} size={30} />
				</TouchableOpacity>
				<DeleteExpense index={index} />
			</View>
		</View>
	);
};

const Styling = StyleSheet.create({
	container: {
		flex: 1,
		height: 120,
		flexDirection: 'row',
		padding: 16,
		backgroundColor: 'white',
		borderRadius: 8,
		marginVertical: 8,
	},
	container2: {
		flex: 1,
		justifyContent: 'space-evenly',
	},
	amount: {
		fontSize: 18,
		fontWeight: 'bold',
	},
	category: {
		fontSize: 18,
		color: 'black',
	},
	date: {
		fontSize: 16,
		lineHeight: 20,
		color: 'grey',
	},
	container3: {
		flex: 0.5,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-around',
	},
});

export default ExpenseItem;
