<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Child_Model extends CI_Model {
	function __construct() {
		parent::__construct();
	}

	function get_all() {
		return $this->db->query('SELECT * FROM persons')->result();
	}

	function get($id) {
		return $this->db->query('SELECT * FROM children WHERE id=' . $id)->row();
	}

	function get_by_person_id($person_id) {
		return $this->db->query('SELECT * FROM children WHERE person_id=' . $person_id . ' ORDER BY date_of_birth DESC')->result();
	}

	function add($person_id, $last_name, $first_name, $middle_name, $gender, $date_of_birth) {
		$this->db->insert('children', array(
			'person_id' => $person_id,
			'last_name' => $last_name,
			'first_name' => $first_name,
			'middle_name' => $middle_name,
			'gender' => $gender,
			'date_of_birth' => $date_of_birth
		));

		return $this->db->insert_id();
	}

	function update($id, $last_name, $first_name, $middle_name, $gender, $date_of_birth) {
		$this->db->where('id', $id);
		$this->db->update('children', array(
			'last_name' => $last_name,
			'first_name' => $first_name,
			'middle_name' => $middle_name,
			'gender' => $gender,
			'date_of_birth' => $date_of_birth
		));
	}


	function delete($id) {
		$this->db->delete('siblings', array('id' => $id));
		return $this->db->affected_rows();
	}
}