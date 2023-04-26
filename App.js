import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity,StyleSheet, ScrollView, Image } from 'react-native';
import axios from 'axios';



const App = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);

  const fetchWeatherData = async () => {
    try {
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${'DIGITE SUA APP ID AQUI'}&units=metric`);
      setWeatherData(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchWeatherData();
  }, []);

  return (
    <View style={styles.container}>

      <View style={styles.header}>
      <Image source={require('./src/images/weatherLogo.png')} />
      <Text style={styles.headerTitle}>Weather App</Text>
      </View>

      <View style={styles.weatherForm}>
        <TextInput
          style={styles.weatherInputSearch}
          onChangeText={text => setCity(text)}
          value={city}
          placeholder="Digite a cidade"
        />
        <TouchableOpacity onPress={() => fetchWeatherData()} style={styles.weatherButton}>
          <Text style={{ fontSize: 20 }}>Buscar Dados</Text>
        </TouchableOpacity>
      </View>

      {weatherData && (
        <View style={{flex:1,marginTop:50}}>
        <ScrollView style={{ marginTop: 5 }} showsHorizontalScrollIndicator={false} horizontal={true}>

          <View  style={styles.cards}>
          <Image source={require('./src/images/mapLogo.png')} style={{ width: 80,height:80}} />
          <Text style={{ fontSize: 20 }}>{weatherData.name}, {weatherData.sys.country}</Text>
          </View>

          <View style={styles.cards}>
          <Image source={require('./src/images/temperatureLogo.png')} style={{ width: 80,height:80}}/>
          <Text style={{ fontSize: 16 }}>Temperatura: {weatherData.main.temp}°C</Text>
          </View>

          <View style={styles.cards}>
          <Image source={require('./src/images/airhumidityLogo.png')} style={{ width: 80,height:80}}/>
          <Text style={{ fontSize: 16 }}>Chances de Chuva: {weatherData.main.feels_like}°C</Text>
          <Text style={{ fontSize: 16 }}>Umidade: {weatherData.main.humidity}%</Text>
          <Text style={{ fontSize: 16 }}>Velocidade do Vento: {weatherData.wind.speed}m/s</Text>
          </View>

        </ScrollView>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
 container:{
  flex:1,
  justifyContent:'center',
  alignItems:'center',
  backgroundColor:'##cedae7',
 },
 header:{
  alignItems:'center',
  marginTop:100,
 },
 headerTitle:{
   fontSize:26,
   fontWeight:'600'
 },
 weatherForm:{
  marginTop: 30,
  alignItems:'center',
 },
 weatherInputSearch:{
  height:60,
  width:340,
  textAlign:'center',
  borderRadius:6,
  borderWidth:2,
  marginRight:10
 },
 weatherButton:{
  justifyContent:'center',
  alignItems:'center',
  backgroundColor:'#fa9224',
  height:50,
  width:340,
  marginTop:8,
  borderRadius:8
 },
 cards:{
  width: 250,
  height: 150,
  backgroundColor: '#fff',
  borderRadius: 10,
  margin: 10,
  padding: 10,
  alignItems: 'center',
  justifyContent: 'center',
  shadowColor:'#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.5,
  shadowRadius: 5,
 }

})

export default App;
