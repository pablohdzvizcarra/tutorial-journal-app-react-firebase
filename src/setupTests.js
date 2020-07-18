import Enzyme from 'enzyme'; // enzyme
import Adapter from 'enzyme-adapter-react-16'; // enzyme
import {createSerializer} from 'enzyme-to-json'; // enzyme to json
import Swal from 'sweetalert2';
 
Enzyme.configure({ adapter: new Adapter() }); // enzyme
expect.addSnapshotSerializer(createSerializer({mode: 'deep'})); // enzyme to json


const noScroll = () => { };

// modificamos el window.scroll para que pase la prueba
Object.defineProperty(window, 'scrollTo', {
  value: noScroll,
  writable: true
});



// poniendo el mock directamente en el setupTest tienes un modo global
// Mocks para las funciones en el componente
// mock de sweetAlert
jest.mock('sweetalert2', () => ({
  fire: jest.fn(),
  close: jest.fn(),
}));