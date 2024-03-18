import { View, FlatList, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';

function PasswordStrengthIndicator({ strength }) {
    let strengthLevels = [
        {label: 'Weak', color: 'red'},
        {label: 'Fair', color: 'orange'},
        {label: 'Okay', color: 'yellow'},
        {label: 'Strong', color: 'green'},
    ]

    return (
        <>
            <View>
                <FlatList
                    data={strengthLevels}
                    renderItem={({ item, index }) => {
                        <View
                            key={index}
                            style={[
                                styles.strengthBox,
                                {backgroundColor: strength == index ? item.color : 'lightgrey'}
                            ]}
                        >
                        </View>
                    }}
                    keyExtractor={(item, index) => index.toString()}
                    horizontal={true} // Set this prop to true for horizontal list
                    showsHorizontalScrollIndicator={false}
                />
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 22,
      },
    item: {
        padding: 0,
        fontSize: 18,
        height: 44,
        width: 50, // Set width for horizontal list items
        margin: 10, // Add margin for spacing between items
        backgroundColor: '#f0f0f0',
      },
    strengthBox: {
        height: 2,
        width: 32,
    }
})

export default PasswordStrengthIndicator;