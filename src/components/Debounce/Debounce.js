import {useDebounce} from "../../hooks/useDebounce";
import {useEffect, useState} from "react";
import Button from "../Button/Button";
import {InputLabel, MenuItem, Select, styled} from "@mui/material";
import {faRedo} from "@fortawesome/free-solid-svg-icons";

const MainContainer = styled('div')`
  width: 100%;
  height: 100%;
  padding: 1rem;
`;

const ExampleContainer = styled('div')`
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
  gap: .5rem;
  color: var(--mint-cream)
`;

const ParameterContainer = styled('div')`
  display: flex;
  gap: 1rem;
  width: 40%;
`;

const Header = styled('div')`
  display: flex;
  gap: 1rem;
  & .title {
    font-size: 1.85rem;
    color: var(--blue-ncs);
  }
  padding-bottom: .5rem;
  border-bottom: 1px solid var(--blue-ncs);
`;

const Explanation = styled('div')`
  margin-top: 1rem;
  color: var(--mint-cream);
    & .mainText {
      width: fit-content;
      font-size: 1.2rem;
      padding-bottom: .25rem;
      color: var(--blue-ncs);
      margin-bottom: .5rem;
      border-bottom: 1px solid var(--blue-ncs);
    };
    & .text {
      font-size: .95rem;
     font-weight: 100;
      line-height: 1.3;
    }
`;

const DebounceSelect = styled('div')`
  color: var(--mint-cream) !important;
`;

const OutputValues = styled('div')`
  padding-top: 1rem;
  & .real {
    display: flex;
    gap: 1rem;
    & .danger {display: inline; color: coral}
    padding-bottom: .5rem;
  }
  & .api {
    display: flex;
    gap: 1rem;
    & .free {color: aquamarine}
  }
`;

const debounceTimeOptions = [
    {id: 1, label: '.25s', value: 250},
    {id: 2, label: '.5s', value: 500},
    {id: 3, label: '1s', value: 1000},
    {id: 4, label: '2s', value: 2000},
]

const Debounce = () => {
    const [value, setValue] = useState('')
    const [firedApi, setFiredApi] = useState('')
    const [debounceDelay, setDebounceDelay] = useState(250)
    const debouncedValue = useDebounce(value, debounceDelay)

    const handleChange = event => {
        setValue(event.target.value)
    }
    const deleteParameters = () => {
        setValue('');
        setFiredApi('');
    }
    // Fetch API (optional)
    useEffect(() => {
        setFiredApi(value);
    }, [debouncedValue])

    return (
        <MainContainer>
            <Header>
                <Button back />
                <h1 className='title'>useDebounce()</h1>
            </Header>
            <Explanation>
                <p className='text'>This React hook helps to limit that the component is re-rendered too many times. Imagine that you want to execute a function on an event that executes several hundred times per second such as moving the mouse or scrolling. This may cause the application to lag. To prevent this, the debounce uses an internal timer to execute the callback function every xx seconds (2nd parameter).</p>
            </Explanation>
            <Explanation>
                <h1 className='mainText'>Example</h1>
                <p className='text'>Introduce values in the input and play with the debounce delay to see the difference between behaviours.</p>
                <p className='text'>Fired api message simulates an API request made with the introduced value in the input.</p>
                <p className='text'>Value real-time shows how the internal value changes independently of the debouncing functionality.</p>
            </Explanation>
            <ExampleContainer>
                <ParameterContainer>
                    <input type="text" value={value} onChange={handleChange} />
                    <DebounceSelect>
                        {/*<InputLabel style={{color: '#EBF5EEFF'}} id="debounceDelayInput">Delay</InputLabel>*/}
                        <Select style={{color: '#EBF5EEFF'}} variant={"standard"} id="debounceDelayInput" value={debounceDelay} onChange={val => setDebounceDelay(val.target.value)} label='Delay'>
                            {debounceTimeOptions.map(option => <MenuItem value={option.value}>{option.label}</MenuItem>)}
                        </Select>
                    </DebounceSelect>
                    <Button onClick={deleteParameters} icon={faRedo}/>
                </ParameterContainer>
                <OutputValues>
                    <div className='real'>
                        <p>Value real-time:</p><p className='danger'>{value}</p>
                    </div>
                    <div className='api'>
                        <p>Fired API with value: </p><p className='free'>{firedApi}</p>
                    </div>
                </OutputValues>

            </ExampleContainer>
        </MainContainer>
    )
}

export default Debounce;