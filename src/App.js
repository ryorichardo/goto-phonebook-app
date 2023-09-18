import logo from './logo.svg';
import './App.css';
import { useQuery } from '@apollo/client';
import GET_CONTACT_LIST from './api/getContactList'
import ContactCard from './components/ContactCard';

function DisplayLocations() {
  const { loading, error, data } = useQuery(GET_CONTACT_LIST, {
    variables: {
        // "where":  {
        //     "first_name": {"_like": "%Dedi%" }
        // }
    }
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  console.log(data)

  return (
    <ContactCard contact={data.contact[0]}/>
  );
}

function App() {
  return (
    <div className="App">
      <DisplayLocations />
    </div>
  );
}

export default App;
