import { StyleSheet, Text, View, SafeAreaView, KeyboardAvoidingView, TouchableOpacity, Image, Dimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import TextInputWithLabel from '../components/TextInputWithLabel'
import ButtonWithLoader from '../components/ButtonWithLoader'
// import validation from '../Utils/Validation'
import { showError, showSuccess } from '../Utils/HelpFunctions'
import { apiPost, setItem } from '../Utils/Utils'
import { LOGIN } from '../config/urls'
import { useDispatch } from 'react-redux'
import { addToken, updateGroup, loggedIN } from '../Redux/action/action'
import { ScrollView } from 'react-native'
import { ActivityIndicator } from 'react-native'
import CheckConnection from '../Utils/CheckConnection'
import validation from '../Utils/Validation'
import { RFValue } from "react-native-responsive-fontsize";

const SignIn = ({ navigation }) => {

  const screenHeight = Dimensions.get('screen').height

  const dispatch = useDispatch()

  const [isClicked, setIsClicked] = useState(false)
  const [selectUserType, setSelectUserType] = useState("Select User type")
  const [emailMobileLable, setEmailMobileLable] = useState("Email / Mobile No")


  const [state, setState] = useState({
    isLoading: true,
    email: '',
    password: '',
    isSecure: true
  })

  const userTypesData = [
    {
      id: "1",
      type: "farmer"
    },
    {
      id: "2",
      type: "expert"
    },
    {
      id: "3",
      type: "Manufacturer / Dealer"
    },
    {
      id: "4",
      type: "Start Up / Enterpreneur"
    },
    {
      id: "5",
      type: "Service Provider"
    },
    {
      id: "6",
      type: "Student"
    },

  ]

  const { isLoading, email, password, isSecure } = state

  const updateState = (data) => setState(() => ({ ...state, ...data }))

  const isValidData = () => {


    if (selectUserType !== "farmer") {
      var error = validation({
        email
      })
    } else {
      error = validation({
        contact: email
      })
    }

    if (error) {
      showError(error)
      return false
    }
    return true
  }

  const onLogin = async () => {
    const checkValid = isValidData()
    if (checkValid) {

      try {

        updateState({ isLoading: false })

        const res = await apiPost(LOGIN, { type: selectUserType, email, password })

        if (res.response) {

          const userid = res.data.id
          const usertoken = res.data.token

          setItem("authDetails", { usertoken, userid })

          updateState({ isLoading: true })

          showSuccess("Success Login")

          dispatch(addToken({ usertoken, userid }))
          dispatch(updateGroup(true))
          dispatch(loggedIN(true))

          navigation.navigate("Index")
        } else {
          showError(res.message)
          updateState({ isLoading: true })
        }

        // navigation.navigate('Signup')
      } catch (error) {
        showError("Internal Server Error")
      }

    }


  }

  const [isConnected, setIsConnected] = useState(true);

  // const userType = route.params.userCategory
  return (
    <KeyboardAvoidingView>

      <CheckConnection isConnected={isConnected} setIsConnected={setIsConnected} />

      <ScrollView style={isConnected ? {} : { display: 'none' }}>

        {
          isLoading ? (null) : (
            <ActivityIndicator size="large" style={styles.ActivityIndicatorLoading} />
          )
        }

        <View style={[styles.secContainer, {height: screenHeight}]}>
          <Text style={styles.headerMain}>Sign In to Your Account</Text>

          {/* =========State dropdown=========  */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>login as</Text>
            <TouchableOpacity style={styles.dropdown} onPress={() => {
              setIsClicked(!isClicked)
            }}>
              <Text>{selectUserType}</Text>
              {isClicked ? (
                <Image source={require("../../assets/icons/arrow-up.png")} style={styles.dropdownIcon} />
              ) : (
                <Image source={require("../../assets/icons/arrow-down.png")} style={styles.dropdownIcon} />
              )}

            </TouchableOpacity>

            {/* dropdown area  */}
            {isClicked ? <View style={styles.dropDownArea}>

              {
                userTypesData.map((item) => {
                  return <TouchableOpacity key={item.id} style={styles.dropdownItem} onPress={() => {
                    setSelectUserType(item.type)
                    setIsClicked(false)
                    item.type === "farmer" ? setEmailMobileLable("Mobile No") : setEmailMobileLable("Email")
                  }}>
                    {<Text style={styles.DropDownOption}>{item.type}</Text>}
                  </TouchableOpacity>

                })
              }

            </View> : null}
          </View>

          <SafeAreaView style={styles.conatiner}>
            <TextInputWithLabel
              // placeholder={`Enter your ${selectUserType === 'farmer' ? "Mobile No" : "Email"}`}
              // label={`${selectUserType === 'farmer' ? "Mobile No" : "Email"}`}
              placeholder={`Enter your ${emailMobileLable}`}
              label={emailMobileLable}
              onChange={(email) => updateState({ email })}
              
            />

            <TextInputWithLabel
              placeholder="Enter Your Passoword"
              label="Password"
              isSecure={isSecure}
              onChange={(password) => updateState({ password })}
            />

            <ButtonWithLoader text="Login" onPress={onLogin} />

          </SafeAreaView>

        </View>

      </ScrollView>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({

  ActivityIndicatorLoading: {
    width: "100%",
    height: "100%",
    elevation: 5
  },
  secContainer: {
    // height: "100%",
    padding: 11,
    paddingTop: 20,
    backgroundColor: "#fff"
  },
  headerMain: {
    fontSize: RFValue(21),
    fontWeight: 800
  },

  conatiner: {
    padding: 11,
    marginTop: 10
  },
  dropdownIcon: {
    width: 20,
    height: 20,
  },
  dropDownArea: {
    width: "100%",
    borderRadius: 10,
    marginTop: 20,
    backgroundColor: "#fff",
    elevation: 5,
    alignSelf: "center",
    paddingBottom: 10
  },

  dropdown: {
    width: "100%",
    height: 50,
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: "#8e8e8e",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 15,
    backgroundColor: "#ade7923d"
  },
  dropdownItem: {
    width: "85%",
    height: 50,
    borderBottomWidth: 0.2,
    borderColor: "#8e8e8e",
    alignSelf: "center",
    justifyContent: "center"
  },
  DropDownOption: {
    textTransform: "capitalize"
  },
  label: {
    fontSize: RFValue(18),
    fontWeight: "bold",
    marginBottom: 8,
    marginTop: 15
  },



})


export default SignIn
