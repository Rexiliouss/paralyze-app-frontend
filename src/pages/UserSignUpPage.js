import React from 'react' //Her React component'i için yapmak zorundayız
import {signup} from '../api/apiCalls';

class UserSignUpPage extends React.Component{
        /*Sınıf olarak oluşturduğumuz için mutlak surette
        React.Component'ten türemesi gerekiyor.
        Her sınıfın mutlaka bir render() fonksiyonu bulunur
        Bu fonksiyon her daim bir JSX return eder.
        Class olmasının özelliği ise bir form oluşturulacak ve kullanıcıdan,
        alacağımız bilgileri tutmak zorundayız.
        React iki farklı component içerir.
        Fonksiyon(App.js) bazlı ve Class(UserSignUpPage.js) bazlıdır.
        Fonsiyon(App.js) -> Stateless olarak adlandırılır. İçinde bir durum barındırmaz.
        Class(UserSignUpPage.js) -> Statefull olarak adlandırılır. İçinde bir durum barındırır ve bilgi alırız.
        UserSignUpPage.js'i index.js'te kullanabilmemiz için,
        Export etmemiz gerekiyor. Her node module'nin bir sınıfı veya fonksiyonu
        export etmesi bekleniyor.
        
        inputlar'a onChange properties tanımlayabiliyoruz.
        Bu property içine ise fonksiyon verebiliyoruz.

        state içinde sayfanın son durumunu tutabiliyoruz.
        state React.Component'tan gelen bir metod. Onu Override ediyoruz.
        */
       state={
           userName:null,
           displayName:null,
           password:null,
           pendingApiCall:false
       };
           /*
           Object Destruction
           event.target içindeki value'yi al ve name'i al.
           
           event.target.value
           event.target.name
           yerine kullanılır.
           */
           onChange=event=>{
            const{name, value} = event.target;
            this.setState({
                [name]:value
            });
        }
            onClickSignUp= async event=>{
                event.preventDefault();
                const{userName,displayName,password} = this.state;
                const body ={
                    userName,
                    displayName,
                    password,
                };

                this.setState({pendingApiCall:true});
                try{
                    const response=await signup(body);
                }catch(error){}
                this.setState({pendingApiCall:false});
                /*
                signup(body)
                .then(response=>{
                    this.setState({pendingApiCall:false});
                }).catch(errror=>{
                    this.setState({pendingApiCall:false});
                });
                */
            }
          render(){
            const{pendingApiCall}=this.state;
              return(
                  <div className='container'>
                      <form>
                          <div className='headerLogo text-center'>
                              <img src='connect-logo.png'></img>
                          </div>
                          <div className='pageHeader'>
                              <h2 className='text-center'>Join our community</h2>
                          </div>
                          <div className='mb-3'>
                              <label className='form-label'>E-Mail:</label>
                              <input name='userName' onChange={this.onChange} type='email' className='form-control'></input>
                          </div>
                          <div className='mb-3'>
                              <label className='form-label'>Display Name:</label>
                              <input name='displayName' onChange={this.onChange} type='text' className='form-control'></input>
                          </div>
                          <div className='mb-3'>
                              <label className='form-label'>Password:</label>
                              <input name='password' onChange={this.onChange} type='password' className='form-control'></input>
                          </div>
                          <div className='mb-3'>
                              <label className='form-label'>Password Checker:</label>
                              <input type='password' className='form-control'></input>
                          </div>
                          <div className='mb-3'>
                              <div className='form-check form-switch'>
                                  <input className='form-check-input' type='checkbox'></input>
                                  <label className='form-check-label'>I accept the user agreement</label>
                              </div>
                          </div>
                          <div className='mb-3'>
                              <div className='form-check form-switch'>
                                  <input className='form-check-input' type='checkbox'></input>
                                  <label className='form-check-label'>I'm not a robot</label>
                              </div>
                          </div>
                          <div className='mb-3'>
                              <div className='text-center'>
                                <button type='submit' className='btn btn-primary'
                                onClick={this.onClickSignUp}
                                disabled={pendingApiCall}>
                                {pendingApiCall && <span className='spinner-border spinner-border-sm'></span>}
                                    Signup</button>
                              </div>
                          </div>
                      </form>
                  </div>
              );
          }
        };
        export default UserSignUpPage;