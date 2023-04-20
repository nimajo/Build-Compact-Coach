import { View, Text } from 'react-native'
import React from 'react'

const HomeScreen = () => {
  return (
    <View>
      <Text>HomeScreen</Text>

            {/** Start Button */}
            <Button
              title="Start"
              onPress={() => navigation.navigate('Login')}
              buttonStyle={{
                alignItems:"center",
                backgroundColor: '#E9663B',
                borderWidth: 2,
                borderColor: 'white',
                borderRadius: 30,
              }}
              containerStyle={{
                
                width: 200,
                marginHorizontal: 100,
                marginVertical: 60,
                
              }}
              titleStyle={{ fontWeight: 'bold' }}></Button>
              


    </View>
  )
}

export default HomeScreen