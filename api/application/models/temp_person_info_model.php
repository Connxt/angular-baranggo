<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Temp_Person_Info_Model extends CI_Model {
	function __construct() {
		parent::__construct();
	}

	function get_all() {
		return $this->db->query('SELECT * FROM temp_person_infos')->result();
	}

	function get($person_id) {
		return $this->db->query('SELECT * FROM temp_person_infos WHERE person_id=' . $person_id . ' ORDER BY id DESC')->result();
	}

	function add(
		$civil_status,
		$religion,
		$annual_income,
		$educational_attainment,
		$is_employed,
		$is_voter,
		$is_deceased,
		$with_philhealth,
		$with_sss,
		$with_electricity,
		$with_water,
		$spouse_last_name,
		$spouse_first_name,
		$spouse_middle_name,
		$spouse_gender,
		$spouse_date_of_birth,
		$person_id,
		$residence_id) {

		$this->db->insert('temp_person_infos', array(
			'civil_status' => $civil_status,
			'religion' => $religion,
			'annual_income' => $annual_income,
			'educational_attainment' => $educational_attainment,
			'is_employed' => $is_employed,
			'is_voter' => $is_voter,
			'is_deceased' => $is_deceased,
			'with_philhealth' => $with_philhealth,
			'with_sss' => $with_sss,
			'with_electricity' => $with_electricity,
			'with_water' => $with_water,
			'spouse_last_name' => $spouse_last_name,
			'spouse_first_name' => $spouse_first_name,
			'spouse_middle_name' => $spouse_middle_name,
			'spouse_gender' => $spouse_gender,
			'spouse_date_of_birth' => $spouse_date_of_birth,
			'person_id' => $person_id,
			'residence_id' => $residence_id,
			'created_at' => date('Y-m-d H:i:s')
		));

		return $this->db->insert_id();
	}
}