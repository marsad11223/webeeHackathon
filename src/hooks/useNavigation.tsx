import { useNavigation, CommonActions } from '@react-navigation/native';

const useNavigate = () => {
  const navigation = useNavigation();

  const navigate = (route: string, data: Object = {}) => {
    navigation.dispatch(CommonActions.navigate(route, data));
  }
  const goback = () => {
    navigation.goBack()
  }

  return { navigate, goback };
};

export default useNavigate;