import { StyleSheet, Text, View, Button } from 'react-native';
import { auth, signInWithGoogle, logOut } from './src/firebase';
import { AuthContext, AuthProvider } from './src/contexts/authContext';
import { useContext } from 'react';

export default function App() {
  const user = useContext(AuthContext);

  return (
    <AuthProvider>
      <View style={styles.container}>
        <Text>Sign in screen</Text>
        <Button
          onPress={signInWithGoogle}
          title="Sign in with Google"
        />
      </View>
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
