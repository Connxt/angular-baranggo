<?php
defined('BASEPATH') OR exit('No direct script access allowed');
require(APPPATH . "/libraries/REST_Controller.php");

class Api extends REST_Controller {
	public function __construct() {
		parent::__construct();

		$this->load->model('person_model');
		$this->load->model('temp_person_info_model');
		$this->load->model('sibling_model');
		$this->load->model('child_model');
		$this->load->model('residence_model');
		$this->load->model('barangay_model');
		$this->load->model('city_model');
		$this->load->model('province_model');
		$this->load->model('barangay_clearance_model');
		$this->load->model('barangay_business_clearance_model');
		$this->load->model('certificate_of_closure_model');
		$this->load->model('user_model');
		$this->load->model('setting_model');
	}

	/**
	 * Persons
	 */
	public function persons_get() {
		$this->response($this->person_model->get_all());
		$persons = $this->person_model->get_all();

		foreach($persons as $person) {
			$person->temp_person_info = $this->temp_person_info_model->get($person->id);
			$person->siblings = $this->sibling_model->get_by_person_id($person->id);
			$person->children = $this->child_model->get_by_person_id($person->id);
		}

		$this->response($persons);
	}

	public function person_get() {
		$person = $this->person_model->get($this->get('id'));

		if(is_null($person)) {
			$this->response(new stdClass());
		}
		else {
			$person->temp_person_info = $this->temp_person_info_model->get($person->id);
			$person->siblings = $this->sibling_model->get_by_person_id($person->id);
			$person->children = $this->child_model->get_by_person_id($person->id);
			$this->response($person);
		}
	}

	public function person_post() {
		$person_id = $this->person_model->add(
			$this->post('lastName'),
			$this->post('firstName'),
			$this->post('middleName'),
			$this->post('dateOfBirth'),
			$this->post('placeOfBirth'),
			$this->post('gender'),
			$this->post('motherLastName'),
			$this->post('motherFirstName'),
			$this->post('motherMiddleName'),
			$this->post('motherDateOfBirth'),
			$this->post('fatherLastName'),
			$this->post('fatherFirstName'),
			$this->post('fatherMiddleName'),
			$this->post('fatherDateOfBirth'),
			$this->post('contactNo'),
			$this->post('email')
		);

		$this->temp_person_info_model->add(
			$this->post('civilStatus'),
			$this->post('religion'),
			$this->post('annualIncome'),
			$this->post('educationalAttainment'),
			$this->post('isEmployed'),
			$this->post('isVoter'),
			$this->post('isDeceased'),
			$this->post('withPhilhealth'),
			$this->post('withSSS'),
			$this->post('withElectricity'),
			$this->post('withWater'),
			$this->post('spouseLastName'),
			$this->post('spouseFirstName'),
			$this->post('spouseMiddleName'),
			$this->post('spouseGender'),
			$this->post('spouseDateOfBirth'),
			$person_id,
			$this->post('residenceId')
		);

		$siblings = $this->post('siblings');
		foreach($siblings as $sibling) {
			$this->sibling_model->add(
				$person_id,
				$sibling['lastName'],
				$sibling['firstName'],
				$sibling['middleName'],
				$sibling['gender'],
				$sibling['dateOfBirth']
			);
		}

		$children = $this->post('children');
		foreach($children as $child) {
			$this->child_model->add(
				$person_id,
				$child['lastName'],
				$child['firstName'],
				$child['middleName'],
				$child['gender'],
				$child['dateOfBirth']
			);
		}

		$person = $this->person_model->get($person_id);
		$person->temp_person_info = $this->temp_person_info_model->get($person->id);
		$person->siblings = $this->sibling_model->get_by_person_id($person->id);
		$person->children = $this->child_model->get_by_person_id($person->id);

		$this->response($person);
	}

	public function person_put() {
		$person_id = $this->put('id');

		$this->person_model->update(
			$person_id,
			$this->put('lastName'),
			$this->put('firstName'),
			$this->put('middleName'),
			$this->put('dateOfBirth'),
			$this->put('placeOfBirth'),
			$this->put('gender'),
			$this->put('motherLastName'),
			$this->put('motherFirstName'),
			$this->put('motherMiddleName'),
			$this->put('motherDateOfBirth'),
			$this->put('fatherLastName'),
			$this->put('fatherFirstName'),
			$this->put('fatherMiddleName'),
			$this->put('fatherDateOfBirth'),
			$this->put('contactNo'),
			$this->put('email')
		);

		$this->temp_person_info_model->add(
			$this->put('civilStatus'),
			$this->put('religion'),
			$this->put('annualIncome'),
			$this->put('educationalAttainment'),
			$this->put('isEmployed'),
			$this->put('isVoter'),
			$this->put('isDeceased'),
			$this->put('withPhilhealth'),
			$this->put('withSSS'),
			$this->put('withElectricity'),
			$this->put('withWater'),
			$this->put('spouseLastName'),
			$this->put('spouseFirstName'),
			$this->put('spouseMiddleName'),
			$this->put('spouseGender'),
			$this->put('spouseDateOfBirth'),
			$person_id,
			$this->put('residenceId')
		);

		$siblings = $this->post('siblings');
		foreach($siblings as $sibling) {
			$this->sibling_model->update(
				$sibling['id'],
				$sibling['lastName'],
				$sibling['firstName'],
				$sibling['middleName'],
				$sibling['gender'],
				$sibling['dateOfBirth']
			);
		}

		$siblings_to_be_added = $this->post('siblingsToBeAdded');
		foreach($siblings_to_be_added as $sibling) {
			$this->sibling_model->add(
				$person_id,
				$sibling['lastName'],
				$sibling['firstName'],
				$sibling['middleName'],
				$sibling['gender'],
				$sibling['dateOfBirth']
			);
		}

		$siblings_to_be_removed = $this->post('siblingsToBeRemoved');
		foreach($siblings_to_be_removed as $sibling) {
			$this->sibling_model->delete($sibling);
		}

		$children = $this->post('children');
		foreach($children as $child) {
			$this->child_model->add(
				$person_id,
				$child['lastName'],
				$child['firstName'],
				$child['middleName'],
				$child['gender'],
				$child['dateOfBirth']
			);
		}

		$person = $this->person_model->get($person_id);
		$person->temp_person_info = $this->temp_person_info_model->get($person->id);
		$person->siblings = $this->sibling_model->get_by_person_id($person->id);
		$person->children = $this->child_model->get_by_person_id($person->id);

		$this->response($person);
	}

	/**
	 * Residences
	 */
	public function residences_get() {
		$residences = $this->residence_model->get_all();

		foreach($residences as $residence) {
			$barangay = $this->barangay_model->get($residence->barangay_id);
			$city = $this->city_model->get($barangay->city_id);
			$province = $this->province_model->get($city->province_id);

			$residence->barangay = $barangay->barangay;
			$residence->city_id = $city->id;
			$residence->city = $city->city;
			$residence->zip_code = $city->zip_code;
			$residence->province_id = $province->id;
			$residence->province = $province->province;
		}

		$this->response($residences);
	}

	public function residence_get() {
		$residence = $this->residence_model->get($this->get('id'));

		if(is_null($residence)) {
			$this->response(new stdClass());
		}
		else {
			$barangay = $this->barangay_model->get($residence->barangay_id);
			$city = $this->city_model->get($barangay->city_id);
			$province = $this->province_model->get($city->province_id);

			$residence->barangay = $barangay->barangay;
			$residence->city_id = $city->id;
			$residence->city = $city->city;
			$residence->zip_code = $city->zip_code;
			$residence->province_id = $province->id;
			$residence->province = $province->province;

			$this->response($residence);
		}
	}

	public function residence_post() {
		$residence_id = $this->residence_model->add(
			$this->post('blockNo'),
			$this->post('lotNo'),
			$this->post('street'),
			$this->post('sitio'),
			$this->post('subdivision'),
			$this->post('latitude'),
			$this->post('longitude'),
			$this->post('barangayId'),
			$this->post('code')
		);

		$residence = $this->residence_model->get($residence_id);
		$barangay = $this->barangay_model->get($residence->barangay_id);
		$city = $this->city_model->get($barangay->city_id);
		$province = $this->province_model->get($city->province_id);

		$residence->barangay = $barangay->barangay;
		$residence->city_id = $city->id;
		$residence->city = $city->city;
		$residence->zip_code = $city->zip_code;
		$residence->province_id = $province->id;
		$residence->province = $province->province;

		$this->response($residence);
	}

	/**
	 * Barangays
	 */
	public function barangays_get() {
		$barangays = $this->barangay_model->get_all();

		foreach($barangays as $barangay) {
			$city = $this->city_model->get($barangay->city_id);
			$province = $this->province_model->get($city->province_id);

			$barangay->city_id = $city->id;
			$barangay->city = $city->city;
			$barangay->zip_code = $city->zip_code;
			$barangay->province_id = $province->id;
			$barangay->province = $province->province;
		}

		$this->response($barangays);
	}

	public function barangay_get() {
		$barangay = $this->barangay_model->get($this->get('id'));

		if(is_null($barangay)) {
			$this->response(new stdClass());
		}
		else {
			$city = $this->city_model->get($barangay->city_id);
			$province = $this->province_model->get($city->province_id);

			$barangay->city_id = $city->id;
			$barangay->city = $city->city;
			$barangay->zip_code = $city->zip_code;
			$barangay->province_id = $province->id;
			$barangay->province = $province->province;

			$this->response($barangay);
		}
	}

	/**
	 * Barangay Clearances
	 */
	public function barangay_clearances_get() {
		$barangay_clearances = $this->barangay_clearance_model->get_all();

		foreach($barangay_clearances as $barangay_clearance) {
			$person = $this->person_model->get($barangay_clearance->person_id);
			$temp_person_info = $this->temp_person_info_model->get_latest($person->id);
			$residence = $this->residence_model->get($temp_person_info->residence_id);
			$barangay = $this->barangay_model->get($residence->barangay_id);
			$city = $this->city_model->get($barangay->city_id);
			$province = $this->province_model->get($city->province_id);

			$barangay_clearance->last_name = $person->last_name;
			$barangay_clearance->first_name = $person->first_name;
			$barangay_clearance->middle_name = $person->middle_name;
			$barangay_clearance->block_no = $residence->block_no;
			$barangay_clearance->lot_no = $residence->lot_no;
			$barangay_clearance->street = $residence->street;
			$barangay_clearance->sitio = $residence->sitio;
			$barangay_clearance->subdivision = $residence->subdivision;
			$barangay_clearance->latitude = $residence->latitude;
			$barangay_clearance->longitude = $residence->longitude;
			$barangay_clearance->barangay_id = $barangay->id;
			$barangay_clearance->barangay = $barangay->barangay;
			$barangay_clearance->city_id = $city->id;
			$barangay_clearance->city = $city->city;
			$barangay_clearance->province_id = $province->id;
			$barangay_clearance->province = $province->province;
		}

		$this->response($barangay_clearances);
	}

	public function barangay_clearance_get() {
		$barangay_clearance = $this->barangay_clearance_model->get($this->get('id'));

		if(is_null($barangay_clearance)) {
			$this->response(new stdClass());
		}
		else {
			$person = $this->person_model->get($barangay_clearance->person_id);
			$temp_person_info = $this->temp_person_info_model->get_latest($person->id);
			$residence = $this->residence_model->get($temp_person_info->residence_id);
			$barangay = $this->barangay_model->get($residence->barangay_id);
			$city = $this->city_model->get($barangay->city_id);
			$province = $this->province_model->get($city->province_id);

			$barangay_clearance->last_name = $person->last_name;
			$barangay_clearance->first_name = $person->first_name;
			$barangay_clearance->middle_name = $person->middle_name;
			$barangay_clearance->block_no = $residence->block_no;
			$barangay_clearance->lot_no = $residence->lot_no;
			$barangay_clearance->street = $residence->street;
			$barangay_clearance->sitio = $residence->sitio;
			$barangay_clearance->subdivision = $residence->subdivision;
			$barangay_clearance->latitude = $residence->latitude;
			$barangay_clearance->longitude = $residence->longitude;
			$barangay_clearance->barangay_id = $barangay->id;
			$barangay_clearance->barangay = $barangay->barangay;
			$barangay_clearance->city_id = $city->id;
			$barangay_clearance->city = $city->city;
			$barangay_clearance->province_id = $province->id;
			$barangay_clearance->province = $province->province;

			$this->response($barangay_clearance);
		}
	}

	public function barangay_clearance_post() {
		$barangay_clearance_id = $this->barangay_clearance_model->add(
			$this->post('personId'),
			$this->post('reason'),
			$this->post('remarks')
		);

		$this->response($this->barangay_clearance_model->get($barangay_clearance_id));
	}

	/**
	 * Barangay Business Clearances
	 */
	public function barangay_business_clearances_get() {
		$barangay_business_clearances = $this->barangay_business_clearance_model->get_all();

		foreach($barangay_business_clearances as $barangay_business_clearance) {
			$person = $this->person_model->get($barangay_business_clearance->person_id);
			$temp_person_info = $this->temp_person_info_model->get_latest($person->id);
			$residence = $this->residence_model->get($temp_person_info->residence_id);
			$barangay = $this->barangay_model->get($residence->barangay_id);
			$city = $this->city_model->get($barangay->city_id);
			$province = $this->province_model->get($city->province_id);

			$barangay_business_clearance->last_name = $person->last_name;
			$barangay_business_clearance->first_name = $person->first_name;
			$barangay_business_clearance->middle_name = $person->middle_name;
			$barangay_business_clearance->block_no = $residence->block_no;
			$barangay_business_clearance->lot_no = $residence->lot_no;
			$barangay_business_clearance->street = $residence->street;
			$barangay_business_clearance->sitio = $residence->sitio;
			$barangay_business_clearance->subdivision = $residence->subdivision;
			$barangay_business_clearance->latitude = $residence->latitude;
			$barangay_business_clearance->longitude = $residence->longitude;
			$barangay_business_clearance->barangay_id = $barangay->id;
			$barangay_business_clearance->barangay = $barangay->barangay;
			$barangay_business_clearance->city_id = $city->id;
			$barangay_business_clearance->city = $city->city;
			$barangay_business_clearance->province_id = $province->id;
			$barangay_business_clearance->province = $province->province;
		}

		$this->response($barangay_business_clearances);
	}

	public function barangay_business_clearance_get() {
		$barangay_business_clearance = $this->barangay_business_clearance_model->get($this->get('id'));

		if(is_null($barangay_business_clearance)) {
			$this->response(new stdClass());
		}
		else {
			$person = $this->person_model->get($barangay_business_clearance->person_id);
			$temp_person_info = $this->temp_person_info_model->get_latest($person->id);
			$residence = $this->residence_model->get($temp_person_info->residence_id);
			$barangay = $this->barangay_model->get($residence->barangay_id);
			$city = $this->city_model->get($barangay->city_id);
			$province = $this->province_model->get($city->province_id);

			$barangay_business_clearance->last_name = $person->last_name;
			$barangay_business_clearance->first_name = $person->first_name;
			$barangay_business_clearance->middle_name = $person->middle_name;
			$barangay_business_clearance->block_no = $residence->block_no;
			$barangay_business_clearance->lot_no = $residence->lot_no;
			$barangay_business_clearance->street = $residence->street;
			$barangay_business_clearance->sitio = $residence->sitio;
			$barangay_business_clearance->subdivision = $residence->subdivision;
			$barangay_business_clearance->latitude = $residence->latitude;
			$barangay_business_clearance->longitude = $residence->longitude;
			$barangay_business_clearance->barangay_id = $barangay->id;
			$barangay_business_clearance->barangay = $barangay->barangay;
			$barangay_business_clearance->city_id = $city->id;
			$barangay_business_clearance->city = $city->city;
			$barangay_business_clearance->province_id = $province->id;
			$barangay_business_clearance->province = $province->province;

			$this->response($barangay_business_clearance);
		}
	}

	public function barangay_business_clearance_post() {
		$barangay_business_clearance_id = $this->barangay_business_clearance_model->add(
			$this->post('personId'),
			$this->post('businessName'),
			$this->post('businessAddress'),
			$this->post('businessType')
		);

		$this->response($this->barangay_business_clearance_model->get($barangay_business_clearance_id));
	}

	/**
	 * Barangay Business Clearances
	 */
	public function certificates_of_closure_get() {
		$certificates_of_closure = $this->certificate_of_closure_model->get_all();

		foreach($certificates_of_closure as $certificate_of_closure) {
			$person = $this->person_model->get($certificate_of_closure->person_id);
			$temp_person_info = $this->temp_person_info_model->get_latest($person->id);
			$residence = $this->residence_model->get($temp_person_info->residence_id);
			$barangay = $this->barangay_model->get($residence->barangay_id);
			$city = $this->city_model->get($barangay->city_id);
			$province = $this->province_model->get($city->province_id);

			$certificate_of_closure->last_name = $person->last_name;
			$certificate_of_closure->first_name = $person->first_name;
			$certificate_of_closure->middle_name = $person->middle_name;
			$certificate_of_closure->block_no = $residence->block_no;
			$certificate_of_closure->lot_no = $residence->lot_no;
			$certificate_of_closure->street = $residence->street;
			$certificate_of_closure->sitio = $residence->sitio;
			$certificate_of_closure->subdivision = $residence->subdivision;
			$certificate_of_closure->latitude = $residence->latitude;
			$certificate_of_closure->longitude = $residence->longitude;
			$certificate_of_closure->barangay_id = $barangay->id;
			$certificate_of_closure->barangay = $barangay->barangay;
			$certificate_of_closure->city_id = $city->id;
			$certificate_of_closure->city = $city->city;
			$certificate_of_closure->province_id = $province->id;
			$certificate_of_closure->province = $province->province;
		}

		$this->response($certificates_of_closure);
	}

	public function certificate_of_closure_get() {
		$certificate_of_closure = $this->certificate_of_closure_model->get($this->get('id'));

		if(is_null($certificate_of_closure)) {
			$this->response(new stdClass());
		}
		else {
			$person = $this->person_model->get($certificate_of_closure->person_id);
			$temp_person_info = $this->temp_person_info_model->get_latest($person->id);
			$residence = $this->residence_model->get($temp_person_info->residence_id);
			$barangay = $this->barangay_model->get($residence->barangay_id);
			$city = $this->city_model->get($barangay->city_id);
			$province = $this->province_model->get($city->province_id);

			$certificate_of_closure->last_name = $person->last_name;
			$certificate_of_closure->first_name = $person->first_name;
			$certificate_of_closure->middle_name = $person->middle_name;
			$certificate_of_closure->block_no = $residence->block_no;
			$certificate_of_closure->lot_no = $residence->lot_no;
			$certificate_of_closure->street = $residence->street;
			$certificate_of_closure->sitio = $residence->sitio;
			$certificate_of_closure->subdivision = $residence->subdivision;
			$certificate_of_closure->latitude = $residence->latitude;
			$certificate_of_closure->longitude = $residence->longitude;
			$certificate_of_closure->barangay_id = $barangay->id;
			$certificate_of_closure->barangay = $barangay->barangay;
			$certificate_of_closure->city_id = $city->id;
			$certificate_of_closure->city = $city->city;
			$certificate_of_closure->province_id = $province->id;
			$certificate_of_closure->province = $province->province;
			
			$this->response($certificate_of_closure);
		}
	}

	public function certificate_of_closure_post() {
		$certificate_of_closure_id = $this->certificate_of_closure_model->add(
			$this->post('personId'),
			$this->post('businessName'),
			$this->post('businessAddress'),
			$this->post('dateClosed')
		);

		$this->response($this->certificate_of_closure_model->get($certificate_of_closure_id));
	}

	/**
	 * Users
	 */
	public function users_get() {
		$this->response($this->user_model->get_all());
	}

	public function user_get() {
		$user = $this->user_model->get($this->get('id'));

		if(is_null($user)) {
			$this->response(new stdClass());
		}
		else {
			$this->response($user);
		}
	}

	/**
	 * Settings
	 */
	public function settings_get() {
		$setting = $this->setting_model->get();

		if(is_null($setting)) {
			$this->response(new stdClass());
		}
		else {
			$barangay = $this->barangay_model->get($setting->barangay_id);
			$city = $this->city_model->get($barangay->city_id);
			$province = $this->province_model->get($city->province_id);

			$setting->barangay = $barangay->barangay;
			$setting->city_id = $city->id;
			$setting->city = $city->city;
			$setting->zip_code = $city->zip_code;
			$setting->province_id = $province->id;
			$setting->province = $province->province;

			$this->response($setting);
		}
	}

	public function setting_post() {
		$this->setting_model->add(
			$this->post('barangayId')
		);

		$setting = $this->setting_model->get();
		$barangay = $this->barangay_model->get($setting->barangay_id);
		$city = $this->city_model->get($barangay->city_id);
		$province = $this->province_model->get($city->province_id);

		$setting->barangay = $barangay->barangay;
		$setting->city_id = $city->id;
		$setting->city = $city->city;
		$setting->zip_code = $city->zip_code;
		$setting->province_id = $province->id;
		$setting->province = $province->province;

		$this->response($setting);
	}

	public function settng_put() {
		$this->setting_model->update(
			$this->put('barangayId')
		);

		$setting = $this->setting_model->get();
		$barangay = $this->barangay_model->get($setting->barangay_id);
		$city = $this->city_model->get($barangay->city_id);
		$province = $this->province_model->get($city->province_id);

		$setting->barangay = $barangay->barangay;
		$setting->city_id = $city->id;
		$setting->city = $city->city;
		$setting->zip_code = $city->zip_code;
		$setting->province_id = $province->id;
		$setting->province = $province->province;

		$this->response($setting);
	}	
}