import '@testing-library/jest-dom';
import { fetchConToken, fetchSinToken } from '../../helpers/fetch';

describe('pruebas en helper fetch', () => {
    let token='';
    test('fetch sin token debe de funcionar', async() => {
        const resp= await fetchSinToken('auth',{email:'algo@gmail.com',password:'123456'},'POST');

        expect(resp instanceof Response).toBe(true);

        const body=await resp.json();
        expect(body.ok).toBe(true);

        token=body.token;
    });

    test('fetch con token debe de funcionar', async() => {
      localStorage.setItem('token',token);

      const resp=await fetchConToken('events/123456789123456',{},'DELETE');
      const body=await resp.json();
    // console.log(body);
      expect(body.msg).toBe('hable con el admin');
    });
    
    
})
