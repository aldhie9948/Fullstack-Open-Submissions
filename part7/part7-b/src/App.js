import { useState } from 'react';

const useField = (type) => {
  const [value, setValue] = useState('');

  const onChange = (e) => {
    setValue(e.target.value);
  };

  return { type, value, onChange };
};

const App = () => {
  const name = useField('text');
  const born = useField('date');
  const height = useField('number');

  const style = {
    padding: 5,
  };

  return (
    <div>
      <form>
        <div style={style}>
          name:
          <input {...name} />
        </div>
        <div style={style}>
          birthdate:
          <input {...born} />
        </div>
        <div style={style}>
          height:
          <input {...height} />
        </div>
      </form>
      <div style={style}>
        {name.value} {born.value} {height.value}
      </div>
    </div>
  );
};

export default App;
