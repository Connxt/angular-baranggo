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
	}

	/**
	 * Persons
	 */
	public function persons_get() {
		$this->response($this->person_model->get_all());
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
		$this->response($this->residence_model->get_all());
	}

	public function residence_get() {
		$this->response($this->residence_model->get($this->get('id')));
	}
}