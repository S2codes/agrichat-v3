import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { AppBar, HStack, IconButton } from "@react-native-material/core";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { Menu, MenuItem, MenuDivider } from 'react-native-material-menu';
import { useNavigation } from '@react-navigation/native';


const Appbar = () => {

    const navigation = useNavigation()

    const [visible, setVisible] = useState(false);

    const hideMenu = () => setVisible(false);

    const showMenu = () => setVisible(true);


    return (
        <AppBar title="AgriChat"
            color='#5D9C59'
            tintColor='#fff'
            style={{ paddingTop: 10, marginTop: 5 }}

            trailing={props => (


                <HStack>

                    {/* <IconButton
                        icon={props => <Icon name="dots-vertical" {...props} />}
                        {...props}
                    /> */}

                    <View
                        style={styles.menuContainer}>
                        <Menu
                            visible={visible}
                            anchor={
                                <IconButton
                                    onPress={showMenu}
                                    icon={props => <Icon name="dots-vertical" {...props} />}
                                    {...props}
                                />
                            }
                            onRequestClose={hideMenu}
                            style={styles.menuBg}
                        >
                            <MenuItem onPress={() => {
                                hideMenu
                                navigation.navigate("Profile")
                            }}>
                                <Text style={styles.menuItem}>Share this App</Text>
                            </MenuItem>
                            <MenuDivider color='#fff' />

                            <MenuItem onPress={() => {
                                hideMenu
                                navigation.navigate("Profile")
                            }}>
                                <Text style={styles.menuItem}>My Profile</Text>
                            </MenuItem>
                            <MenuDivider color='#fff' />

                            <MenuItem style={styles.menuItem} onPress={() => {
                                hideMenu
                                navigation.navigate('Language Setting')
                            }
                            }>
                                <Text style={styles.menuItem}>Change Language</Text>
                            </MenuItem>
                            <MenuDivider color='#fff' />

                            <MenuItem style={styles.menuItem} onPress={() => {
                                hideMenu
                                navigation.navigate('Contact Us')
                            }}>
                                <Text style={styles.menuItem}>Contact Us</Text>
                            </MenuItem>
                            <MenuDivider color='#fff' />



                        </Menu>
                    </View>

                </HStack>
            )}

        />
    )
}

export default Appbar

const styles = StyleSheet.create({
    menuContainer: {
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    menuBg: {
        backgroundColor: "#5D9C59"
    },
    menuItem: {
        color: "white"
    }


})