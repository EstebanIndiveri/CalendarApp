import '@testing-library/jest-dom';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import Swal from 'sweetalert2';
import { startChecking, startLogin, startRegister } from '../../actions/auth';
import * as fetchModule from '../../helpers/fetch';
import { types } from '../../types/types';
const middlewares=[thunk];
const mockStore=configureStore(middlewares);
const initState={};
let store=mockStore(initState);

jest.mock('sweetalert2',()=>({
fire:jest.fn()
}));
Storage.prototype.setItem=jest.fn();

describe('Purebas en las acciones del auth', () => {
    beforeEach(()=>{
        store=mockStore(initState);
        jest.clearAllMocks();
    });

    test('startLogin correct',async () => {
        // document.addEventListener("DOMContentLoaded", async()=> {
        //     return await store.dispatch(startLogin('algo@gmail.com','123456'));
            
        //   });
          await store.dispatch(startLogin('algo@gmail.com','123456'));

          const actions=store.getActions();

          expect(actions[0]).toEqual({
              type:types.authLogin,
              payload:{
                  uid:expect.any(String),
                  name:expect.any(String)
              }
          });
          expect(localStorage.setItem).toHaveBeenCalledWith('token',expect.any(String));
          expect(localStorage.setItem).toHaveBeenCalledWith('token-init-date',expect.any(Number));

    });
    test('startLogin incorrecto', async() => {
        await store.dispatch(startLogin('algo@gmail.com','133323456'));

        const actions=store.getActions();

        expect(actions).toEqual([]);
        // expect(Swal.fire).toHaveBeenCalled();

    });
    test('startRegister correcto', async() => {
        //name,email,password
        fetchModule.fetchSinToken=jest.fn(()=>({
            json(){
                return {
                    ok:true,
                    uid:'123',
                    name:'Carlos',
                    token:'abc123abc123'
                }
            }
        }));
        await store.dispatch(startRegister('juan','algo1@gmail.com','123456'));

        const actions=store.getActions();

        expect(actions[0]).toEqual({
            type:types.authLogin,
            payload:{
                uid:'123',
                name:'Carlos',

            }
        })
        expect(localStorage.setItem).toHaveBeenCalledWith('token','abc123abc123');
        expect(localStorage.setItem).toHaveBeenCalledWith('token-init-date',expect.any(Number));
    });
    test('StartCheking correcto', async() => {

        fetchModule.fetchConToken=jest.fn(()=>({
            json(){
                return {
                    ok:true,
                    uid:'123',
                    name:'Carlos',
                    token:'abc123abc123'
                }
            }
        }));

        await store.dispatch(startChecking());
        const actions=store.getActions();
        expect(actions[0]).toEqual({
            type:types.authLogin,
            payload:{
                uid:'123',
                name:'Carlos'
            }
        });
        expect(localStorage.setItem).toHaveBeenCalledWith('token','abc123abc123');
    })
    
})
