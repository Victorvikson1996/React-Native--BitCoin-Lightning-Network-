import BdkRn from 'bdk-rn';
import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  ScrollView,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {Button, DefaultButton} from '../Components/Buttons';
import {COLORS} from '../Utils';
import {DefaultTextInput} from '../Components/TextInputs';

const bitcoinColor = '#F7931A';

const HomeScreen = () => {
  const [mnemonic, setMnemonic] = useState('');
  const [displayText, setDisplayText] = useState('');
  const [balance, setBalance] = useState();
  const [wallet, setWallet] = useState();
  const [syncResponse, setSyncResponse] = useState();
  const [address, setAddress] = useState();
  const [transaction, setTransaction] = useState();
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState();

  //from BDK

  const [keyInfo, setKeyInfo] = useState();
  const [descriptor, setDescriptor] = useState('');

  const getMnemonic = async () => {
    const {data} = await BdkRn.generateMnemonic({
      length: 12,
      network: 'testnet',
      // entropy: 256,
    });
    setMnemonic(data);
    console.log(data);
    setDisplayText(JSON.stringify(data));
  };

  const createExtendedKey = async () => {
    const {data} = await BdkRn.createExtendedKey({
      network: 'testnet',
      mnemonic: mnemonic,
      password: 'password',
    });
    setKeyInfo(data);
    setDisplayText(JSON.stringify(data));
  };

  const createWallet = async () => {
    const {data} = await BdkRn.createWallet({
      mnemonic: mnemonic,
      network: 'testnet',
      useDescriptor: true,
      descriptor: descriptor,
    });
    setWallet(data);
    console.log('Address', data);
    setDisplayText(JSON.stringify(data));
  };

  const createDescriptor = async () => {
    const {data} = await BdkRn.createDescriptor({
      network: 'testnet',
      mnemonic: mnemonic,
      password: 'password',
      xprv: keyInfo?.xprv,
    });
    setKeyInfo(data);
    setDisplayText(JSON.stringify(data));
  };

  const syncWallet = async () => {
    await BdkRn.syncWallet();
    const {data} = await BdkRn.getBalance();
    setBalance(data);
    console.log('BALANCE', data + `` + 'Sat');
    setDisplayText(JSON.stringify(data));
  };

  const getAddress = async () => {
    const {data} = await BdkRn.getNewAddress();
    setAddress(data);
    setDisplayText(data);
  };

  const sendTx = async () => {
    const {data} = await BdkRn.quickSend({
      address: recipient,
      amount: amount,
    });
    setTransaction(data);
    setDisplayText(JSON.stringify(data));
  };

  const Address = 'tb1qs3fgj5msxr87aj8namgul4wtfy7a5sxg2mljtd';

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={{marginHorizontal: 20}}>
        <DefaultTextInput />
        <View style={styles.content}>
          <View style={{marginTop: 20}}>
            {displayText && <Text selectable>Response: {displayText}</Text>}
          </View>

          <DefaultButton onPress={getMnemonic} title="Generate Mnemonic" />
          <DefaultButton
            onPress={createExtendedKey}
            title="create Extended Key"
          />
          <DefaultButton onPress={createWallet} title="Create Wallet" />
          <DefaultButton onPress={createDescriptor} title="Create Descriptor" />
          <DefaultButton onPress={syncWallet} title="getBalance" />
          <DefaultButton onPress={getAddress} title="getAddress" />
          <DefaultButton onPress={sendTx} title="Send BitCoin" />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  content: {
    alignContent: 'center',
    alignItems: 'center',
  },
  container: {
    padding: 20,
    alignItems: 'center',
  },
  headerSection: {
    marginTop: 15,
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  balanceSection: {
    padding: 10,
    width: '90%',
    flexDirection: 'row',
    borderColor: bitcoinColor,
    borderWidth: 2,
    justifyContent: 'center',
    marginTop: 20,
    borderRadius: 10,
  },
  responseSection: {
    width: '90%',
    marginTop: 10,
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderColor: bitcoinColor,
    borderWidth: 2,
    backgroundColor: '#FDEBD0',
    borderRadius: 10,
  },
  methodSection: {
    alignItems: 'center',
    width: '90%',
    marginTop: 10,
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderColor: bitcoinColor,
    borderWidth: 2,
    borderRadius: 10,
  },
  sendSection: {
    alignItems: 'center',
    width: '90%',
    marginTop: 10,
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderColor: bitcoinColor,
    borderWidth: 2,
    borderRadius: 10,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginHorizontal: 30,
  },
  balanceText: {
    alignSelf: 'center',
    fontSize: 15,
    fontWeight: 'bold',
  },
  btnText: {
    alignSelf: 'center',
    fontSize: 15,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  responseText: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  input: {
    borderColor: bitcoinColor,
    borderWidth: 2,
    width: '80%',
    padding: 5,
    margin: 5,
    borderRadius: 5,
  },
  methodButton: {
    color: bitcoinColor,
  },
  btn: {
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    backgroundColor: bitcoinColor,
    marginVertical: 5,
    width: '80%',
  },
});

export default HomeScreen;
