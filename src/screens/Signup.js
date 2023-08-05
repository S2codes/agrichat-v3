import {
  StyleSheet,
  Text, View, SafeAreaView,
  KeyboardAvoidingView, ScrollView, TouchableOpacity, Image, Linking, ActivityIndicator
} from 'react-native'
import React, { useState, useEffect, useRef } from 'react'
import TextInputWithLabel from '../components/TextInputWithLabel'
import ButtonWithLoader from '../components/ButtonWithLoader'
import CheckBox from 'expo-checkbox'
import { fetchBlock, fetchDistict, fetchState } from '../Utils/FetchLocation'
import { showError, showSuccess } from '../Utils/HelpFunctions'
import Validation from '../Utils/Validation'
import { apiPost, setItem } from '../Utils/Utils'
import { SIGNUP } from '../config/urls'
import CheckConnection from '../Utils/CheckConnection'
import { RFValue } from "react-native-responsive-fontsize";


const Signup = ({ navigation, route }) => {

  // const navigation = useNavigation()

  const userType = route.params.userCategory

  // const dispatch = useDispatch()

  const [state, setState] = useState({
    isLoading: false,
    userName: "",
    email: '',
    password: '',
    contact: '',
    userStateId: '',
    userDistrictId: '',
    userBlockId: '',
    isNumeric: '',
    isSecure: true
  })

  const { isLoading, userName, email, password, contact, userStateId, userDistrictId, userBlockId, isSecure } = state

  const updateState = (data) => setState(() => ({ ...state, ...data }))


  const [states, setStates] = useState()
  const [districts, setDistricts] = useState()
  const [blocks, setBlocks] = useState()

  // fetch state 
  const fetchStateDetails = async () => {
    const s = await fetchState();
    setStates(s)
    updateState({ isLoading: true })
  }
  // fetch districts 
  const fetchDistricts = async (stateId) => {
    updateState({ isLoading: false })
    const d = await fetchDistict(stateId);
    setDistricts(d)
    updateState({ isLoading: true })
  }
  // fetch blocks 
  const fetchBlocks = async (districId) => {
    updateState({ isLoading: false })
    const b = await fetchBlock(districId);
    setBlocks(b)
    updateState({ isLoading: true })
  }


  useEffect(() => {
    fetchStateDetails()

    if (userType === "farmer") {
      updateState({ email: "farmer@gmail.com" })
    }

  }, [])


  // dropdown 
  const [isClicked, setIsClicked] = useState(false)
  const [selectState, setSelectState] = useState("Select Your State / UT")

  const [isDistrictClicked, setIsDistrictClicked] = useState(false)
  const [selectDistrict, setSelectDistrict] = useState("Select Your District")

  const [isBlockClicked, setIsBlockClicked] = useState(false)
  const [selectBlock, setSelectBlock] = useState("Select Your Block /  Taluk")

  const stateRef = useRef(null)
  const districtRef = useRef(null)
  const blockRef = useRef(null)


  // validation 
  const isValidData = () => {


    let error = true

    if (userType === 'farmer') {
      error = Validation({
        userName, password, contact
      })
    } else {
      error = Validation({
        userName, email, password, contact
      })
    }

    if (error) {
      showError(error)
      return false
    }
    return true
  }

  // checkbox   


  const [isChecked, setIsChecked] = useState(false)

  const onSignup = async () => {


    if (userStateId === "") {
      showError("Please select your state / Ut")
      return
    }
    if (userDistrictId === "") {
      showError("Please select your District")
      return
    }
    if (userBlockId === "") {
      showError("Please select your Block")
      return
    }

    const userData = {
      name: userName,
      userType: userType,
      mobile: contact,
      email: email,
      state: userStateId,
      district: userDistrictId,
      block: userBlockId,
      password: password
    }

    const checkValid = isValidData()
    if (checkValid) {

      try {
        const res = await apiPost(SIGNUP, userData)

        if (res.exits) {
          showError("Already Have an account")
          return
        }

        if (res.response) {
          const userid = res.data[0].id
          const usertoken = res.data[0].token

          // setItem("usertoken", { usertoken, userid })

          setItem("authDetails", { usertoken, userid })

          // dispatch(addToken({ usertoken, userid }))

          showSuccess("Success")
          navigation.navigate('Chatgroups')

        } else {
          showError("Network Error")
        }

      } catch (error) {
        showError("Internal Server Error")
      }


    }
  

  }


  // terms and condition link 

  const privacyLink = "https://docs.google.com/document/d/1gFaKekoEZ4MBty-6rZeTyk0TgI2zLJJD/edit?usp=drivesdk&ouid=102516098685127899221&rtpof=true&sd=true"

  const onPrivacyClick = async () => {
    const supported = await Linking.canOpenURL(privacyLink);
    if (supported) {
      await Linking.openURL(privacyLink)
    } else {
      alert(`Don't know how to open this URL: ${privacyLink}`)
    }

  }


  const [isConnected, setIsConnected] = useState(true);

  return (
    <>

      <CheckConnection isConnected={isConnected} setIsConnected={setIsConnected} />

      <SafeAreaView style={isConnected ? { flex: 1 } : { display: 'none' }}>

        {
          isLoading ? (null) : (
            <ActivityIndicator size="large" style={styles.ActivityIndicatorLoading} />
          )
        }


        <KeyboardAvoidingView>
          <ScrollView style={{ flexGrow: 1 }}
            nestedScrollEnabled={true}>

            <View style={styles.secContainer}>

              <Text style={styles.headerMain}>Create An Account</Text>
              <Text style={styles.headerSubMain}>as a {userType}</Text>

              <TextInputWithLabel
                placeholder="Enter Your Name"
                label="Name"
                onChange={(userName) => updateState({ userName })}
              />

              {
                userType === "farmer" ? ("") : (
                  <TextInputWithLabel
                    placeholder="Enter Your Email"
                    label="Email"
                    onChange={(email) => updateState({ email })}
                  />
                )
              }



              <TextInputWithLabel
                placeholder="Enter Your 10 digit Mobile Number"
                label="Mobile Number"
                isNumeric={'numeric'}
                onChange={(contact) => updateState({ contact })}
              />


              {/* =========State dropdown=========  */}
              <View style={styles.inputGroup}>
                <Text style={styles.label}>State / UT</Text>
                <TouchableOpacity style={styles.dropdown} onPress={() => {
                  setIsClicked(!isClicked)
                  setIsDistrictClicked(false)
                  setIsBlockClicked(false)
                }}>
                  <Text>{selectState}</Text>
                  {isClicked ? (
                    <Image source={require("../../assets/icons/arrow-up.png")} style={styles.dropdownIcon} />
                  ) : (
                    <Image source={require("../../assets/icons/arrow-down.png")} style={styles.dropdownIcon} />
                  )}

                </TouchableOpacity>

                {/* dropdown area  */}
                {isClicked ? <View style={styles.dropDownArea}>

                  {
                    states && states.map((item) => {
                      return <TouchableOpacity key={item.id} style={styles.dropdownItem} onPress={() => {
                        setSelectState(item.state)
                        stateRef.current = item.state
                        updateState({ userStateId: item.id })
                        setSelectDistrict("Select Your District")
                        setIsClicked(false)
                      }}>
                        {<Text>{item.state}</Text>}
                      </TouchableOpacity>

                    })
                  }
                </View> : null}
              </View>

              {/* =========District dropdown=========  */}
              <View style={styles.inputGroup}>
                <Text style={styles.label}>District</Text>
                <TouchableOpacity style={styles.dropdown} onPress={async () => {
                  if (stateRef.current == null) {
                    setSelectDistrict("Select State First")
                  } else {
                    await fetchDistricts(userStateId)
                    setIsDistrictClicked(!isDistrictClicked)
                    setIsClicked(false)
                    setIsBlockClicked(false)
                  }
                }}>
                  <Text>{selectDistrict}</Text>
                  {isDistrictClicked ? (
                    <Image source={require("../../assets/icons/arrow-up.png")} style={styles.dropdownIcon} />
                  ) : (
                    <Image source={require("../../assets/icons/arrow-down.png")} style={styles.dropdownIcon} />
                  )}

                </TouchableOpacity>

                {/* dropdown area  */}
                {isDistrictClicked ? <View style={styles.dropDownArea}>

                  {
                    districts && districts.map((item) => {
                      return <TouchableOpacity key={item.id} style={styles.dropdownItem} onPress={() => {
                        setSelectDistrict(item.district)
                        districtRef.current = item.district
                        updateState({ userDistrictId: item.id })
                        setIsDistrictClicked(false)
                        setSelectBlock("Select Your Block")
                      }}>
                        <Text>{item.district}</Text>
                      </TouchableOpacity>

                    })

                  }



                </View> : null}
              </View>

              {/* =========Block dropdown=========  */}
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Block /  Taluk</Text>

                <TouchableOpacity style={styles.dropdown} onPress={async () => {
                  if (districtRef.current == null) {
                    setSelectBlock("Select District First")
                  } else {
                    await fetchBlocks(userDistrictId)
                    setIsBlockClicked(!isBlockClicked)
                    setIsDistrictClicked(false)
                    setIsClicked(false)
                  }

                }}>
                  <Text>{selectBlock}</Text>
                  {isBlockClicked ? (
                    <Image source={require("../../assets/icons/arrow-up.png")} style={styles.dropdownIcon} />
                  ) : (
                    <Image source={require("../../assets/icons/arrow-down.png")} style={styles.dropdownIcon} />
                  )}

                </TouchableOpacity>

                {/* dropdown area  */}
                {isBlockClicked ? <View style={styles.dropDownArea}>

                  {
                    blocks && blocks.map((item) => {
                      return <TouchableOpacity key={item.id} style={styles.dropdownItem} onPress={() => {
                        setSelectBlock(item.block)
                        blockRef.current = item.block
                        updateState({ userBlockId: item.id })
                        setIsBlockClicked(false)
                      }}>
                        <Text>{item.block}</Text>
                      </TouchableOpacity>

                    })
                  }



                </View> : null}
              </View>

              <TextInputWithLabel
                placeholder="Enter Your Password"
                label="Password"
                isSecure={isSecure}
                onChange={(password) => updateState({ password })}
              />


              <View style={styles.checkBoxGroup}>
                <CheckBox value={isChecked} onValueChange={() => {
                  setIsChecked(!isChecked)
                }} />

                <View style={styles.checkBoxLabel}>

                  <Text >I have already read & agreed with </Text>
                  <TouchableOpacity onPress={() => onPrivacyClick()} >
                    <Text style={styles.privacyText}>Privacy Policy</Text>
                  </TouchableOpacity>

                </View>

              </View>


              <ButtonWithLoader text='Sign up' isDisabled={!isChecked} onPress={
                () => {
                  onSignup()
                }
              } />


              <View style={styles.formContainer}>
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>

    </>
  )


}

export default Signup


const styles = StyleSheet.create({

  ActivityIndicatorLoading: {
    width: "100%",
    height: "100%",
    elevation: 5
  },

  passowordGroup: {
    flex: 1
  },
  togglePasswordBtn: {
    position: "absolute",
    right: 9,
    bottom: 5,
    alignItems: 'stretch',
    width: 33,
    height: 33

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
    paddingBottom: 10,
  },
  searchInput: {
    width: "90%",
    height: 50,
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: "#8e8e8e",
    alignSelf: "center",
    marginTop: 20,
    paddingLeft: 15
  },
  dropdownItem: {
    width: "85%",
    height: 50,
    borderBottomWidth: 0.2,
    borderColor: "#8e8e8e",
    alignSelf: "center",
    justifyContent: "center",
    
  },

  checkBoxGroup: {
    display: "flex",
    flexDirection: "row",
    marginTop: 10,
  },

  checkBoxLabel: {
    marginLeft: 10,
    display: "flex",
    flexDirection: "row"
  },
  privacyText: {
    color: "#5D9C59",
    fontSize: RFValue(16)
  },



  secContainer: {
    height: "100%",
    padding: 11,
    paddingTop: 20,
    backgroundColor: "#fff"
  },

  headerMain: {
    fontSize: RFValue(21),
    fontWeight: 800
  },
  headerSubMain: {
    fontSize: RFValue(18),
    fontWeight: 800,
    textTransform: "capitalize"

  },
  formContainer: {
    marginTop: 20,
    marginBottom: 30
  },
  inputGroup: {
    marginBottom: 10,
  },
  label: {
    fontSize: RFValue(16),
    marginBottom: 2
  },
  input: {
    borderWidth: 0.5,
    borderColor: "#8e8e8e",
    paddingVertical: 7,
    paddingHorizontal: 8,
    borderRadius: 7
  },
  signupBtn: {
    backgroundColor: "#5D9C59",
    paddingVertical: 15
  },
  btnText: {
    color: "#fff",
    textAlign: "center"
  },
  loginOption: {
    marginTop: 11,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  para: {
    color: "#656565",
    fontSize: RFValue(16)
  },
  link: {
    fontSize: RFValue(18),
    color: "#007bff",
    marginLeft: 4
  },


  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 5,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: "96%"
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    marginBottom: 20,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },




})
