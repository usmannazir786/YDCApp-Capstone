import { View, Text, StyleSheet } from 'react-native';
import { ProgressBar } from 'react-native-paper';

function PasswordStrengthIndicator({ strength }) {
    let progressVal;
    let progressColour;
    let strengthLabel;
    
    //Set progress based on strength
    if (strength === null || strength === undefined) {
        progressVal = 0;
        progressColour = 'grey';
        strengthLabel = 'Weak';
    } else {
        switch (strength) {
            case 0:
                progressVal=0;
                progressColour='grey';
                strengthLabel = 'Weak';
                break;
            case 1:
                progressVal=0.25;
                progressColour='red';
                strengthLabel = 'Bad';
                break;
            case 2:
                progressVal=0.5;
                progressColour='orange';
                strengthLabel = 'Okay';
                break;
            case 3:
                progressVal=0.75;
                progressColour='lightgreen';
                strengthLabel = 'Good';
                break;
            case 4:
                progressVal=1;
                progressColour='green';
                strengthLabel = 'Strong';
                break;
            default:
                progressVal=0;
                progressColour='grey';
                strengthLabel = 'Weak';
        }
    }

    const checkProgress = (x) => {
        if (progressVal === 0) {
            return false;
        } else {
            return true;
        }
    }
    
    return (
        <>
            <View>
                <ProgressBar
                    progress={progressVal}
                    color={progressColour}
                    style={styles.progressBar}
                />
                {checkProgress(progressVal) && (
                    <Text style={[styles.text, {color: progressColour}]}>{strengthLabel}</Text>
                )}
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    progressBar: {
        height: 6,
        width: 300,
        borderRadius: 5
    },
    text: {
        textAlign: 'right'
    }
})

export default PasswordStrengthIndicator;