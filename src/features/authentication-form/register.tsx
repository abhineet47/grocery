import React, { useContext } from 'react';
import Link from 'next/link';
import {
  Button,
  IconWrapper,
  Wrapper,
  Container,
  LogoWrapper,
  Heading,
  SubHeading,
  HelperText,
  Offer,
  Input,
  Divider,
  LinkButton,
} from './authentication-form.style';
import firebase from '../../utils/firebase';
import { AuthContext } from 'contexts/auth/auth.context';
import { FormattedMessage, useIntl } from 'react-intl';

export default function SignOutModal() {
  const intl = useIntl();
  const { authDispatch } = useContext<any>(AuthContext);
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const [error, setError] = React.useState('');


  const toggleSignInForm = () => {
    authDispatch({
      type: 'SIGNIN',
    });
  };
  
  const CreateNewUser=(email,phone,password,UserId)=>{
    return {
        "email": email, 
        "phone": phone,
        "password":password,
        "username":UserId,
        "status":1
    }

  }



  const signUpCallback = async () => {
    var uniqidref = firebase.database().ref('UniqueId');
    var UniqueId = 0;
    uniqidref.on("value", function(snapshot) {
        UniqueId = snapshot.val()+1;
        }, function (error) {
            console.log("Error: " + error.code);
    });
    var users = firebase.database().ref('Users');
    var newLength = 10-UniqueId.toString().length;
    var newId = "MFB"+ Array(newLength).fill(0).join('')+UniqueId;
    try{
        await firebase.auth().createUserWithEmailAndPassword(email, password);
        await users.child(newId).set(CreateNewUser(email,phone,password,newId));
        await uniqidref.set(UniqueId);
        toggleSignInForm();
    }catch(e){
        setError("Error"); 
    }
  };

  
  return (
    <Wrapper>
      <Container>
        <Heading>
          <FormattedMessage id="signUpBtnText" defaultMessage="Sign Up"  />
        </Heading>
        <SubHeading>
          <FormattedMessage
            id="signUpText"
            defaultMessage="Every fill is required in sign up"
          />
        </SubHeading>
        {error.length>0?<span style={{marginBottom:"14px","position": "relative","top": "-15px","color": "red"}}
    
>Error while Registering User.Try Again later</span>:''}
        <form >
        <Input
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          required
          placeholder={intl.formatMessage({
            id: 'emailAddressPlaceholder',
            defaultMessage: 'Email Address',
          })}
        />

        <Input
            type="text"
            onChange={(e) => setPhone(e.target.value)}
            placeholder={intl.formatMessage({
              id: 'phonePlaceholder',
              defaultMessage: 'Phone Number.',
            })}

            required
          />

        <Input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          placeholder={intl.formatMessage({
            id: 'passwordPlaceholder',
            defaultMessage: 'Password (min 6 characters)',
          })}
          required
        />
        <HelperText style={{ padding: '20px 0 30px' }}>
          <FormattedMessage
            id="signUpText"
            defaultMessage="By signing up, you agree to Pickbazar's"
          />{' '}
          <Link href="/">
            <a>
              <FormattedMessage
                id="termsConditionText"
                defaultMessage="Terms &amp; Condtion"
              />
            </a>
          </Link>
        </HelperText>
        <Button
          variant="primary"
          size="big"
          style={{ width: '100%' }}
          type="button"
          onClick={signUpCallback}
        >
          <FormattedMessage id="continueBtn" defaultMessage="Continue" />
        </Button>
        </form>
        <Divider>
          <span>
            <FormattedMessage id="orText" defaultMessage="or" />
          </span>
        </Divider>
       
        <Offer style={{ padding: '20px 0' }}>
          <FormattedMessage
            id="alreadyHaveAccount"
            defaultMessage="Already have an account?"
          />{' '}
          <LinkButton onClick={toggleSignInForm}>
            <FormattedMessage id="loginBtnText" defaultMessage="Login" />
          </LinkButton>
        </Offer>
      </Container>
    </Wrapper>
  );
}
