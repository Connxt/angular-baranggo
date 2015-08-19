<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Census_Model extends CI_Model {
	function __construct() {
		parent::__construct();
	}

	function get_all_censuses() {
		$censuses = $this->db->query('SELECT * FROM censuses')->result();

		return $censuses;
	}

	function add_person($last_name, $first_name, $middle_name) {
		$this->db->insert('censuses', array(
			'last_name' => $last_name,
			'first_name' => $first_name,
			'middle_name' => $middle_name
		));
	}
}