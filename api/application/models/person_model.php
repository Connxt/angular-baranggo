<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Person_Model extends CI_Model {
	function __construct() {
		parent::__construct();
	}

	function get_all() {
		return $this->db->query('SELECT * FROM persons')->result();
	}

	function get($id) {
		return $this->db->query('SELECT * FROM persons WHERE id=' . $id)->row();
	}

	function add($last_name, $first_name, $middle_name, $date_of_birth, $place_of_birth, $gender, $mother_last_name, $mother_first_name, $mother_middle_name, $mother_date_of_birth, $father_last_name, $father_first_name, $father_middle_name, $father_date_of_birth, $contact_no, $email) {
		$this->db->insert('persons', array(
			'last_name' => $last_name,
			'first_name' => $first_name,
			'middle_name' => $middle_name,
			'date_of_birth' => $date_of_birth,
			'place_of_birth' => $place_of_birth,
			'gender' => $gender,
			'mother_last_name' => $mother_last_name,
			'mother_first_name' => $mother_first_name,
			'mother_middle_name' => $mother_middle_name,
			'mother_date_of_birth' => $mother_date_of_birth,
			'father_last_name' => $father_last_name,
			'father_first_name' => $father_first_name,
			'father_middle_name' => $father_middle_name,
			'father_date_of_birth' => $father_date_of_birth,
			'contact_no' => $contact_no,
			'email' => $email,
			'created_at' => date('Y-m-d H:i:s'),
			'updated_at' => date('Y-m-d H:i:s')
		));

		return $this->db->insert_id();
	}

	function update($id, $last_name, $first_name, $middle_name, $date_of_birth, $place_of_birth, $gender, $mother_last_name, $mother_first_name, $mother_middle_name, $mother_date_of_birth, $father_last_name, $father_first_name, $father_middle_name, $father_date_of_birth, $contact_no, $email) {
		$this->db->where('id', $id);
		$this->db->update('persons', array(
			'last_name' => $last_name,
			'first_name' => $first_name,
			'middle_name' => $middle_name,
			'date_of_birth' => $date_of_birth,
			'place_of_birth' => $place_of_birth,
			'gender' => $gender,
			'mother_last_name' => $mother_last_name,
			'mother_first_name' => $mother_first_name,
			'mother_middle_name' => $mother_middle_name,
			'mother_date_of_birth' => $mother_date_of_birth,
			'father_last_name' => $father_last_name,
			'father_first_name' => $father_first_name,
			'father_middle_name' => $father_middle_name,
			'father_date_of_birth' => $father_date_of_birth,
			'contact_no' => $contact_no,
			'email' => $email,
			'updated_at' => date('Y-m-d H:i:s')
		));
	}

	function delete($id) {
		$this->db->delete('persons', array('id' => $id));
		return $this->db->affected_rows();
	}
}