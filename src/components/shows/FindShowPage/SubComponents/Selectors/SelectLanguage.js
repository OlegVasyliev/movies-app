import { Form, Col } from "react-bootstrap";

const SelectLanguage = () => {
	return (
		<Form.Group as={Col}>
			<Form.Label>Show language</Form.Label>
			<Form.Select name="language">
				<option value=""></option>
				<option value="Afrikaans">Afrikaans</option>
				<option value="Albanian">Albanian</option>
				<option value="Arabic">Arabic</option>
				<option value="Armenian">Armenian</option>
				<option value="Azerbaijani">Azerbaijani</option>
				<option value="Basque">Basque</option>
				<option value="Belarusian">Belarusian</option>
				<option value="Bengali">Bengali</option>
				<option value="Bosnian">Bosnian</option>
				<option value="Bulgarian">Bulgarian</option>
				<option value="Catalan">Catalan</option>
				<option value="Chechen">Chechen</option>
				<option value="Chinese">Chinese</option>
				<option value="Croatian">Croatian</option>
				<option value="Czech">Czech</option>
				<option value="Danish">Danish</option>
				<option value="Divehi">Divehi</option>
				<option value="Dutch">Dutch</option>
				<option value="English">English</option>
				<option value="Estonian">Estonian</option>
				<option value="Finnish">Finnish</option>
				<option value="French">French</option>
				<option value="Galician">Galician</option>
				<option value="Georgian">Georgian</option>
				<option value="German">German</option>
				<option value="Greek">Greek</option>
				<option value="Gujarati">Gujarati</option>
				<option value="Hebrew">Hebrew</option>
				<option value="Hindi">Hindi</option>
				<option value="Hungarian">Hungarian</option>
				<option value="Icelandic">Icelandic</option>
				<option value="Indonesian">Indonesian</option>
				<option value="Irish">Irish</option>
				<option value="Italian">Italian</option>
				<option value="Japanese">Japanese</option>
				<option value="Javanese">Javanese</option>
				<option value="Kannada">Kannada</option>
				<option value="Kazakh">Kazakh</option>
				<option value="Kongo">Kongo</option>
				<option value="Korean">Korean</option>
				<option value="Latin">Latin</option>
				<option value="Latvian">Latvian</option>
				<option value="Lithuanian">Lithuanian</option>
				<option value="Luxembourgish">Luxembourgish</option>
				<option value="Malay">Malay</option>
				<option value="Malayalam">Malayalam</option>
				<option value="Marathi">Marathi</option>
				<option value="Mongolian">Mongolian</option>
				<option value="Norwegian">Norwegian</option>
				<option value="Panjabi">Panjabi</option>
				<option value="Pashto">Pashto</option>
				<option value="Persian">Persian</option>
				<option value="Polish">Polish</option>
				<option value="Portuguese">Portuguese</option>
				<option value="Romanian">Romanian</option>
				<option value="Russian">Russian</option>
				<option value="Serbian">Serbian</option>
				<option value="Sinhalese">Sinhalese</option>
				<option value="Slovak">Slovak</option>
				<option value="Slovenian">Slovenian</option>
				<option value="Spanish">Spanish</option>
				<option value="Swedish">Swedish</option>
				<option value="Tagalog">Tagalog</option>
				<option value="Tamil">Tamil</option>
				<option value="Telugu">Telugu</option>
				<option value="Thai">Thai</option>
				<option value="Turkish">Turkish</option>
				<option value="Ukrainian">Ukrainian</option>
				<option value="Urdu">Urdu</option>
				<option value="Uzbek">Uzbek</option>
				<option value="Vietnamese">Vietnamese</option>
				<option value="Welsh">Welsh</option>
				<option value="Scottish Gaelic">Scottish Gaelic</option>
			</Form.Select>
		</Form.Group>
	);
};

export default SelectLanguage;
