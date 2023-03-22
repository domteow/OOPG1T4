import React from 'react'
import { useState, useEffect } from 'react'
import axios from '../../api/axios'
import { ReactDOM } from 'react-dom'
import { Link, Router, Route, Routes, BrowserRouter, useNavigate, useParams } from 'react-router-dom'
import '../../index.css'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Navbar from '../../navbar';
import DeleteIcon from '@mui/icons-material/Delete';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import AddIcon from '@mui/icons-material/Add';
import Chip from '@mui/material/Chip';
import Paper from '@mui/material/Paper';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import { styled } from '@mui/material/styles';
import FormControlLabel from '@mui/material/FormControlLabel';
import CircularProgress from '@mui/material/CircularProgress';
import FormLabel from '@mui/material/FormLabel';
import Autocomplete from '@mui/material/Autocomplete';
import Stack from '@mui/material/Stack';

const ListItem = styled('li')(({ theme }) => ({
    margin: theme.spacing(0.5),
}));

export default function VendorDetails(){
    const vendorId = useParams().vendorId; 
    const [vendor, setVendor] = useState({})
    const [isLoading, setLoading] = useState(true); 
    const [vendorCountry, setVendorCountry] = useState([])
    const [allCountry, setAllCountry] = useState([])
    const [isDisabled, setIsDisabled] = useState(true);
    const navigate = useNavigate();
    const [values, setValues] = useState({});
    const [storePwd, setStorePwd] = useState();

    useEffect(() => { 
        setTimeout(() => { 
        axios.get("/api/v1/vendor/getVendor/" + vendorId)
        .then((response) => {
            setVendor(response.data.data);
            // setVendorCountry(response.data.data.countries)
            setLoading(false); //set loading state
            console.log(response.data.data);
            for(let country in response.data.data.countries){
                console.log(response.data.data.countries[country]);
                setAllCountry (prev => ([...prev, {label: response.data.data.countries[country]}]));
            }

            setValues({
                accountType : 'Vendor',
                countries : response.data.data.countries,
                name: response.data.data.name,
                company: response.data.data.company,
                phoneNumber: response.data.data.phoneNumber,
                faxNumber: response.data.data.faxNumber,
                emailAddress: response.data.data.emailAddress,
                password: response.data.data.password,
                id: parseInt(vendorId)
        
            });

            setStorePwd(response.data.data.password)

          });
         }, 800);
    }, []);
    console.log(allCountry);

    const handleCancel = () => {
        setIsDisabled(true);
        navigate('/react/viewvendor/' + vendorId)
    }

    const editVendor = () => {
        setIsDisabled(false);
    }

    const [pwdError, setPwdError] = useState(null);
    const [cfmPwdError, setCfmPwdError] = useState(null);
    
    const [emailError, setEmailError] = useState(null);
    const [phoneError, setPhoneError] = useState(null);
    const [faxError, setFaxError] = useState(null);

    const validatePwd = (pwd, pwd2) => {
        if (pwd.length >= 8){
            if (pwd === pwd2){
                return true;
            }
            else{
                setPwdError('Passwords do not match')
                setCfmPwdError('Passwords do not match')
            }
        }
        else{
            setPwdError('Passwords need to be at least 8 characters long')
            setCfmPwdError('Passwords  need to be at least 8 characters long')
        }
    }

    const handleChange = (e) => {
        const {name, value} = e.target; 
        if (name === 'countries'){
            setValues({
                ...values, 
                [name]: value.split(',')
            })
        }
        else{
            setValues({
                ...values, 
                [name]: value
            })
        }
    }

    const handlePassword = (e) =>{
        setStorePwd(e.target.value);
    }

    const [county, setCounty] = useState([countries[196]])
    const [prevCounty, setPrevCounty] = useState([countries[196]])
    console.log(county);

    const handleCounty = (newValue) => {
        setCounty([]);
        // console.log(newValue);
        newValue.map(country => {
            const countryName = country.label;
            console.log(countryName);
            setCounty(prev => [...prev, countryName]);
        })
        console.log(county);
    }
    if (prevCounty !== county){
        setPrevCounty(county);
        setValues({
            ...values,
            countries: county
        })
    }
    
    // console.log(county);

    const validateEmail = (email) => {
        if(/\S+@\S+\.\S+/.test(email)){
            return true;
        }
        else{
            setEmailError('Email is not valid');
        }
    }

    const validatePhone = (phone) => {
        if (phone[0] === '8' || phone[0] === '9') {
            if (phone.length === 8){
                if (/^[0-9]+$/.test(phone)){
                    return true;
                }
            }
        }
        else{
            setPhoneError("Please enter a valid phone number")
        }
    }

    const validateFax = (phone) => {
        if (phone.length >= 8){
            if (/^[0-9]+$/.test(phone)){
                return true;
            }
        }
        
        else{
            setFaxError("Please enter a valid fax number")
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(values);
        setPhoneError(null);
        setFaxError(null);
        setPwdError(null);
        setEmailError(null);
        setCfmPwdError(null);
        const isPwdValid = validatePwd(values.password, storePwd);
        const isEmail = validateEmail(values.emailAddress);
        const isPhone = validatePhone(values.phoneNumber);
        const isFax = validateFax(values.faxNumber);
        
        if (isPwdValid && isEmail && isPhone && isFax) {
            updateVendor();            
        }
    }

    console.log(vendorId)
    console.log(values);
    const updateVendor = async() => {
        console.log(values);
        
        try {
            console.log(values);
            console.log(vendorId);
            const response = await axios.put('/api/v1/vendor/editVendor/' + vendorId, values);
            console.log(response.data);
            if (response.data.status == 200) {
                navigate('/react/viewvendor/' + vendorId)
                alert('Vendor updated successfully')
            }
        }
        catch (error){
            console.log(error);
        }
    }








    if(isLoading) {
        return (
            <div style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "100vh",
            }}> <CircularProgress /> Loading the Vendor details {console.log("loading state")}</div>
        );
    }
    else{
        return(
            <>
                <Navbar />

                <div className='mainContent'>
                    <div className='editVendorRow'>
                        <button className='editVendorButton' onClick={editVendor}>
                            Edit Vendor Details
                        </button>
                    </div>
                    <Container>
                        <Row className='formRow'>
                            <Col xs={6} md={4} xl={2} className='formQuestion'>
                                Name:
                            </Col>
                            <Col xs={12} md={8} className='formInput'>
                                <TextField required name='name' className='inputtext' disabled={isDisabled} type='text' defaultValue={vendor.name} onChange={handleChange} />
                            </Col>
                        </Row>

                        <Row className='formRow'>
                            <Col xs={6} md={4} xl={2} className='formQuestion'>
                                Company Name:
                            </Col>
                            <Col xs={12} md={8} className='formInput'>
                                <TextField required name='company' className='inputtext' disabled={isDisabled} type='text' defaultValue={vendor.company} onChange={handleChange} />
                            </Col>
                        </Row>

                        <Row className='formRow'>
                            <Col xs={6} md={4} xl={2} className='formQuestion'>
                                Email Address:
                            </Col>
                            <Col xs={12} md={8} className='formInput'>
                                <TextField required name='emailAddress' disabled={isDisabled} className='inputtext' type='text' defaultValue={vendor.emailAddress} onChange={handleChange} />
                            </Col>
                            {emailError && <div className='errorMsg' >{emailError}</div>}
                        </Row>

                        <Row className='formRow'>
                            <Col xs={6} md={4} xl={2} className='formQuestion'>
                                Password:
                            </Col>
                            <Col xs={12} md={8} className='formInput'>
                                <TextField required name='password' disabled={isDisabled} className='inputtext' sx={{':disabled': {color:"#FFE9e9"}}} type='text' defaultValue={vendor.password} onChange={handleChange} />
                            </Col>
                            {pwdError && <div className='errorMsg' >{pwdError}</div>}
                        </Row>
                        
                        <Row className='formRow'>
                            <Col xs={6} md={4} xl={2} className='formQuestion'>
                                Confirm Password:
                            </Col>
                            <Col xs={12} md={8} className='formInput'>
                                <TextField required name='cfmPassword' disabled={isDisabled} className='inputtext' type='text' defaultValue={vendor.password} onChange={handleChange} />
                            </Col>
                            {cfmPwdError && <div className='errorMsg'>{cfmPwdError}</div>}
                        </Row>

                        <Row className='formRow'>
                            <Col xs={6} md={4} xl={2} className='formQuestion'>
                                Phone Number:
                            </Col>
                            <Col xs={12} md={8} className='formInput'>
                                <TextField required name='phoneNumber' disabled={isDisabled} className='inputtext' type='text' defaultValue={vendor.phoneNumber} onChange={handleChange} />
                            </Col>
                            {phoneError && <div className='errorMsg' >{phoneError}</div>}
                        </Row>

                        <Row className='formRow'>
                            <Col xs={6} md={4} xl={2} className='formQuestion'>
                                Fax Number:
                            </Col>
                            <Col xs={12} md={8} className='formInput'>
                                <TextField required name='faxNumber' disabled={isDisabled} className='inputtext' type='text' defaultValue={vendor.faxNumber} />
                            </Col>
                            {faxError && <div className='errorMsg' >{faxError}</div>}
                        </Row>

                        <Row className='formRow'>
                            <Col xs={6} md={4} xl={2} className='formQuestion'>
                                Countries:
                            </Col>
                            <Col xs={12} md={8} className='formInput'>
                                <Stack spacing={3} sx={{width:'95%'}}>
                                    <Autocomplete
                                        onChange={(event, newValue) => {
                                            handleCounty(newValue)
                                        }}
                                        required ={true}
                                        disabled={isDisabled}
                                        multiple
                                        id="tags-outlined"
                                        options={countries}
                                        getOptionLabel={(option) => option.label}
                                        defaultValue={allCountry}

                                        filterSelectedOptions
                                        renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            label="Countries Active In"
                                            placeholder="Country(s)"
                                        />
                                        )}
                                    />  
                                </Stack>
                            </Col>
                        </Row>  

                    </Container>
                    <div className="buttonFormRow">
                        <button onClick={handleCancel} className='cancelFormButton'>
                            Cancel
                        </button>

                        <button className='createFormButton' onClick={handleSubmit}>
                            Confirm Edit
                        </button>
                    </div>
                </div> 
            </>
        )
    }
}






const countries = [
    { code: 'AD', label: 'Andorra', phone: '376' },
    {
      code: 'AE',
      label: 'United Arab Emirates',
      phone: '971',
    },
    { code: 'AF', label: 'Afghanistan', phone: '93' },
    {
      code: 'AG',
      label: 'Antigua and Barbuda',
      phone: '1-268',
    },
    { code: 'AI', label: 'Anguilla', phone: '1-264' },
    { code: 'AL', label: 'Albania', phone: '355' },
    { code: 'AM', label: 'Armenia', phone: '374' },
    { code: 'AO', label: 'Angola', phone: '244' },
    { code: 'AQ', label: 'Antarctica', phone: '672' },
    { code: 'AR', label: 'Argentina', phone: '54' },
    { code: 'AS', label: 'American Samoa', phone: '1-684' },
    { code: 'AT', label: 'Austria', phone: '43' },
    {
      code: 'AU',
      label: 'Australia',
      phone: '61',
      suggested: true,
    },
    { code: 'AW', label: 'Aruba', phone: '297' },
    { code: 'AX', label: 'Alland Islands', phone: '358' },
    { code: 'AZ', label: 'Azerbaijan', phone: '994' },
    {
      code: 'BA',
      label: 'Bosnia and Herzegovina',
      phone: '387',
    },
    { code: 'BB', label: 'Barbados', phone: '1-246' },
    { code: 'BD', label: 'Bangladesh', phone: '880' },
    { code: 'BE', label: 'Belgium', phone: '32' },
    { code: 'BF', label: 'Burkina Faso', phone: '226' },
    { code: 'BG', label: 'Bulgaria', phone: '359' },
    { code: 'BH', label: 'Bahrain', phone: '973' },
    { code: 'BI', label: 'Burundi', phone: '257' },
    { code: 'BJ', label: 'Benin', phone: '229' },
    { code: 'BL', label: 'Saint Barthelemy', phone: '590' },
    { code: 'BM', label: 'Bermuda', phone: '1-441' },
    { code: 'BN', label: 'Brunei Darussalam', phone: '673' },
    { code: 'BO', label: 'Bolivia', phone: '591' },
    { code: 'BR', label: 'Brazil', phone: '55' },
    { code: 'BS', label: 'Bahamas', phone: '1-242' },
    { code: 'BT', label: 'Bhutan', phone: '975' },
    { code: 'BV', label: 'Bouvet Island', phone: '47' },
    { code: 'BW', label: 'Botswana', phone: '267' },
    { code: 'BY', label: 'Belarus', phone: '375' },
    { code: 'BZ', label: 'Belize', phone: '501' },
    {
      code: 'CA',
      label: 'Canada',
      phone: '1',
      suggested: true,
    },
    {
      code: 'CC',
      label: 'Cocos (Keeling) Islands',
      phone: '61',
    },
    {
      code: 'CD',
      label: 'Congo, Democratic Republic of the',
      phone: '243',
    },
    {
      code: 'CF',
      label: 'Central African Republic',
      phone: '236',
    },
    {
      code: 'CG',
      label: 'Congo, Republic of the',
      phone: '242',
    },
    { code: 'CH', label: 'Switzerland', phone: '41' },
    { code: 'CI', label: "Cote d'Ivoire", phone: '225' },
    { code: 'CK', label: 'Cook Islands', phone: '682' },
    { code: 'CL', label: 'Chile', phone: '56' },
    { code: 'CM', label: 'Cameroon', phone: '237' },
    { code: 'CN', label: 'China', phone: '86' },
    { code: 'CO', label: 'Colombia', phone: '57' },
    { code: 'CR', label: 'Costa Rica', phone: '506' },
    { code: 'CU', label: 'Cuba', phone: '53' },
    { code: 'CV', label: 'Cape Verde', phone: '238' },
    { code: 'CW', label: 'Curacao', phone: '599' },
    { code: 'CX', label: 'Christmas Island', phone: '61' },
    { code: 'CY', label: 'Cyprus', phone: '357' },
    { code: 'CZ', label: 'Czech Republic', phone: '420' },
    {
      code: 'DE',
      label: 'Germany',
      phone: '49',
      suggested: true,
    },
    { code: 'DJ', label: 'Djibouti', phone: '253' },
    { code: 'DK', label: 'Denmark', phone: '45' },
    { code: 'DM', label: 'Dominica', phone: '1-767' },
    {
      code: 'DO',
      label: 'Dominican Republic',
      phone: '1-809',
    },
    { code: 'DZ', label: 'Algeria', phone: '213' },
    { code: 'EC', label: 'Ecuador', phone: '593' },
    { code: 'EE', label: 'Estonia', phone: '372' },
    { code: 'EG', label: 'Egypt', phone: '20' },
    { code: 'EH', label: 'Western Sahara', phone: '212' },
    { code: 'ER', label: 'Eritrea', phone: '291' },
    { code: 'ES', label: 'Spain', phone: '34' },
    { code: 'ET', label: 'Ethiopia', phone: '251' },
    { code: 'FI', label: 'Finland', phone: '358' },
    { code: 'FJ', label: 'Fiji', phone: '679' },
    {
      code: 'FK',
      label: 'Falkland Islands (Malvinas)',
      phone: '500',
    },
    {
      code: 'FM',
      label: 'Micronesia, Federated States of',
      phone: '691',
    },
    { code: 'FO', label: 'Faroe Islands', phone: '298' },
    {
      code: 'FR',
      label: 'France',
      phone: '33',
      suggested: true,
    },
    { code: 'GA', label: 'Gabon', phone: '241' },
    { code: 'GB', label: 'United Kingdom', phone: '44' },
    { code: 'GD', label: 'Grenada', phone: '1-473' },
    { code: 'GE', label: 'Georgia', phone: '995' },
    { code: 'GF', label: 'French Guiana', phone: '594' },
    { code: 'GG', label: 'Guernsey', phone: '44' },
    { code: 'GH', label: 'Ghana', phone: '233' },
    { code: 'GI', label: 'Gibraltar', phone: '350' },
    { code: 'GL', label: 'Greenland', phone: '299' },
    { code: 'GM', label: 'Gambia', phone: '220' },
    { code: 'GN', label: 'Guinea', phone: '224' },
    { code: 'GP', label: 'Guadeloupe', phone: '590' },
    { code: 'GQ', label: 'Equatorial Guinea', phone: '240' },
    { code: 'GR', label: 'Greece', phone: '30' },
    {
      code: 'GS',
      label: 'South Georgia and the South Sandwich Islands',
      phone: '500',
    },
    { code: 'GT', label: 'Guatemala', phone: '502' },
    { code: 'GU', label: 'Guam', phone: '1-671' },
    { code: 'GW', label: 'Guinea-Bissau', phone: '245' },
    { code: 'GY', label: 'Guyana', phone: '592' },
    { code: 'HK', label: 'Hong Kong', phone: '852' },
    {
      code: 'HM',
      label: 'Heard Island and McDonald Islands',
      phone: '672',
    },
    { code: 'HN', label: 'Honduras', phone: '504' },
    { code: 'HR', label: 'Croatia', phone: '385' },
    { code: 'HT', label: 'Haiti', phone: '509' },
    { code: 'HU', label: 'Hungary', phone: '36' },
    { code: 'ID', label: 'Indonesia', phone: '62' },
    { code: 'IE', label: 'Ireland', phone: '353' },
    { code: 'IL', label: 'Israel', phone: '972' },
    { code: 'IM', label: 'Isle of Man', phone: '44' },
    { code: 'IN', label: 'India', phone: '91' },
    {
      code: 'IO',
      label: 'British Indian Ocean Territory',
      phone: '246',
    },
    { code: 'IQ', label: 'Iraq', phone: '964' },
    {
      code: 'IR',
      label: 'Iran, Islamic Republic of',
      phone: '98',
    },
    { code: 'IS', label: 'Iceland', phone: '354' },
    { code: 'IT', label: 'Italy', phone: '39' },
    { code: 'JE', label: 'Jersey', phone: '44' },
    { code: 'JM', label: 'Jamaica', phone: '1-876' },
    { code: 'JO', label: 'Jordan', phone: '962' },
    {
      code: 'JP',
      label: 'Japan',
      phone: '81',
      suggested: true,
    },
    { code: 'KE', label: 'Kenya', phone: '254' },
    { code: 'KG', label: 'Kyrgyzstan', phone: '996' },
    { code: 'KH', label: 'Cambodia', phone: '855' },
    { code: 'KI', label: 'Kiribati', phone: '686' },
    { code: 'KM', label: 'Comoros', phone: '269' },
    {
      code: 'KN',
      label: 'Saint Kitts and Nevis',
      phone: '1-869',
    },
    {
      code: 'KP',
      label: "Korea, Democratic People's Republic of",
      phone: '850',
    },
    { code: 'KR', label: 'Korea, Republic of', phone: '82' },
    { code: 'KW', label: 'Kuwait', phone: '965' },
    { code: 'KY', label: 'Cayman Islands', phone: '1-345' },
    { code: 'KZ', label: 'Kazakhstan', phone: '7' },
    {
      code: 'LA',
      label: "Lao People's Democratic Republic",
      phone: '856',
    },
    { code: 'LB', label: 'Lebanon', phone: '961' },
    { code: 'LC', label: 'Saint Lucia', phone: '1-758' },
    { code: 'LI', label: 'Liechtenstein', phone: '423' },
    { code: 'LK', label: 'Sri Lanka', phone: '94' },
    { code: 'LR', label: 'Liberia', phone: '231' },
    { code: 'LS', label: 'Lesotho', phone: '266' },
    { code: 'LT', label: 'Lithuania', phone: '370' },
    { code: 'LU', label: 'Luxembourg', phone: '352' },
    { code: 'LV', label: 'Latvia', phone: '371' },
    { code: 'LY', label: 'Libya', phone: '218' },
    { code: 'MA', label: 'Morocco', phone: '212' },
    { code: 'MC', label: 'Monaco', phone: '377' },
    {
      code: 'MD',
      label: 'Moldova, Republic of',
      phone: '373',
    },
    { code: 'ME', label: 'Montenegro', phone: '382' },
    {
      code: 'MF',
      label: 'Saint Martin (French part)',
      phone: '590',
    },
    { code: 'MG', label: 'Madagascar', phone: '261' },
    { code: 'MH', label: 'Marshall Islands', phone: '692' },
    {
      code: 'MK',
      label: 'Macedonia, the Former Yugoslav Republic of',
      phone: '389',
    },
    { code: 'ML', label: 'Mali', phone: '223' },
    { code: 'MM', label: 'Myanmar', phone: '95' },
    { code: 'MN', label: 'Mongolia', phone: '976' },
    { code: 'MO', label: 'Macao', phone: '853' },
    {
      code: 'MP',
      label: 'Northern Mariana Islands',
      phone: '1-670',
    },
    { code: 'MQ', label: 'Martinique', phone: '596' },
    { code: 'MR', label: 'Mauritania', phone: '222' },
    { code: 'MS', label: 'Montserrat', phone: '1-664' },
    { code: 'MT', label: 'Malta', phone: '356' },
    { code: 'MU', label: 'Mauritius', phone: '230' },
    { code: 'MV', label: 'Maldives', phone: '960' },
    { code: 'MW', label: 'Malawi', phone: '265' },
    { code: 'MX', label: 'Mexico', phone: '52' },
    { code: 'MY', label: 'Malaysia', phone: '60' },
    { code: 'MZ', label: 'Mozambique', phone: '258' },
    { code: 'NA', label: 'Namibia', phone: '264' },
    { code: 'NC', label: 'New Caledonia', phone: '687' },
    { code: 'NE', label: 'Niger', phone: '227' },
    { code: 'NF', label: 'Norfolk Island', phone: '672' },
    { code: 'NG', label: 'Nigeria', phone: '234' },
    { code: 'NI', label: 'Nicaragua', phone: '505' },
    { code: 'NL', label: 'Netherlands', phone: '31' },
    { code: 'NO', label: 'Norway', phone: '47' },
    { code: 'NP', label: 'Nepal', phone: '977' },
    { code: 'NR', label: 'Nauru', phone: '674' },
    { code: 'NU', label: 'Niue', phone: '683' },
    { code: 'NZ', label: 'New Zealand', phone: '64' },
    { code: 'OM', label: 'Oman', phone: '968' },
    { code: 'PA', label: 'Panama', phone: '507' },
    { code: 'PE', label: 'Peru', phone: '51' },
    { code: 'PF', label: 'French Polynesia', phone: '689' },
    { code: 'PG', label: 'Papua New Guinea', phone: '675' },
    { code: 'PH', label: 'Philippines', phone: '63' },
    { code: 'PK', label: 'Pakistan', phone: '92' },
    { code: 'PL', label: 'Poland', phone: '48' },
    {
      code: 'PM',
      label: 'Saint Pierre and Miquelon',
      phone: '508',
    },
    { code: 'PN', label: 'Pitcairn', phone: '870' },
    { code: 'PR', label: 'Puerto Rico', phone: '1' },
    {
      code: 'PS',
      label: 'Palestine, State of',
      phone: '970',
    },
    { code: 'PT', label: 'Portugal', phone: '351' },
    { code: 'PW', label: 'Palau', phone: '680' },
    { code: 'PY', label: 'Paraguay', phone: '595' },
    { code: 'QA', label: 'Qatar', phone: '974' },
    { code: 'RE', label: 'Reunion', phone: '262' },
    { code: 'RO', label: 'Romania', phone: '40' },
    { code: 'RS', label: 'Serbia', phone: '381' },
    { code: 'RU', label: 'Russian Federation', phone: '7' },
    { code: 'RW', label: 'Rwanda', phone: '250' },
    { code: 'SA', label: 'Saudi Arabia', phone: '966' },
    { code: 'SB', label: 'Solomon Islands', phone: '677' },
    { code: 'SC', label: 'Seychelles', phone: '248' },
    { code: 'SD', label: 'Sudan', phone: '249' },
    { code: 'SE', label: 'Sweden', phone: '46' },
    { code: 'SG', label: 'Singapore', phone: '65' },
    { code: 'SH', label: 'Saint Helena', phone: '290' },
    { code: 'SI', label: 'Slovenia', phone: '386' },
    {
      code: 'SJ',
      label: 'Svalbard and Jan Mayen',
      phone: '47',
    },
    { code: 'SK', label: 'Slovakia', phone: '421' },
    { code: 'SL', label: 'Sierra Leone', phone: '232' },
    { code: 'SM', label: 'San Marino', phone: '378' },
    { code: 'SN', label: 'Senegal', phone: '221' },
    { code: 'SO', label: 'Somalia', phone: '252' },
    { code: 'SR', label: 'Suriname', phone: '597' },
    { code: 'SS', label: 'South Sudan', phone: '211' },
    {
      code: 'ST',
      label: 'Sao Tome and Principe',
      phone: '239',
    },
    { code: 'SV', label: 'El Salvador', phone: '503' },
    {
      code: 'SX',
      label: 'Sint Maarten (Dutch part)',
      phone: '1-721',
    },
    {
      code: 'SY',
      label: 'Syrian Arab Republic',
      phone: '963',
    },
    { code: 'SZ', label: 'Swaziland', phone: '268' },
    {
      code: 'TC',
      label: 'Turks and Caicos Islands',
      phone: '1-649',
    },
    { code: 'TD', label: 'Chad', phone: '235' },
    {
      code: 'TF',
      label: 'French Southern Territories',
      phone: '262',
    },
    { code: 'TG', label: 'Togo', phone: '228' },
    { code: 'TH', label: 'Thailand', phone: '66' },
    { code: 'TJ', label: 'Tajikistan', phone: '992' },
    { code: 'TK', label: 'Tokelau', phone: '690' },
    { code: 'TL', label: 'Timor-Leste', phone: '670' },
    { code: 'TM', label: 'Turkmenistan', phone: '993' },
    { code: 'TN', label: 'Tunisia', phone: '216' },
    { code: 'TO', label: 'Tonga', phone: '676' },
    { code: 'TR', label: 'Turkey', phone: '90' },
    {
      code: 'TT',
      label: 'Trinidad and Tobago',
      phone: '1-868',
    },
    { code: 'TV', label: 'Tuvalu', phone: '688' },
    {
      code: 'TW',
      label: 'Taiwan, Republic of China',
      phone: '886',
    },
    {
      code: 'TZ',
      label: 'United Republic of Tanzania',
      phone: '255',
    },
    { code: 'UA', label: 'Ukraine', phone: '380' },
    { code: 'UG', label: 'Uganda', phone: '256' },
    {
      code: 'US',
      label: 'United States',
      phone: '1',
      suggested: true,
    },
    { code: 'UY', label: 'Uruguay', phone: '598' },
    { code: 'UZ', label: 'Uzbekistan', phone: '998' },
    {
      code: 'VA',
      label: 'Holy See (Vatican City State)',
      phone: '379',
    },
    {
      code: 'VC',
      label: 'Saint Vincent and the Grenadines',
      phone: '1-784',
    },
    { code: 'VE', label: 'Venezuela', phone: '58' },
    {
      code: 'VG',
      label: 'British Virgin Islands',
      phone: '1-284',
    },
    {
      code: 'VI',
      label: 'US Virgin Islands',
      phone: '1-340',
    },
    { code: 'VN', label: 'Vietnam', phone: '84' },
    { code: 'VU', label: 'Vanuatu', phone: '678' },
    { code: 'WF', label: 'Wallis and Futuna', phone: '681' },
    { code: 'WS', label: 'Samoa', phone: '685' },
    { code: 'XK', label: 'Kosovo', phone: '383' },
    { code: 'YE', label: 'Yemen', phone: '967' },
    { code: 'YT', label: 'Mayotte', phone: '262' },
    { code: 'ZA', label: 'South Africa', phone: '27' },
    { code: 'ZM', label: 'Zambia', phone: '260' },
    { code: 'ZW', label: 'Zimbabwe', phone: '263' },
  ];