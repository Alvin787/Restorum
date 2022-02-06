import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './src/components/home';
import ContentCard from './src/components/UI/ContentCard.jsx';
import Post from './src/components/post';
import CreatePost from './src/components/CreatePost';
import { AuthContext, AuthProvider } from './src/contexts/authContext';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <AuthProvider>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Post Page" component={Post} />
          <Stack.Screen name="Content Card" component={ContentCard} />
          <Stack.Screen name="Create Post" component={CreatePost} />
        </Stack.Navigator>
      </AuthProvider>
    </NavigationContainer>
  );
}
