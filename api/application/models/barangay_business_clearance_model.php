<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Barangay_Business_Clearance_Model extends CI_Model {
	function __construct() {
		parent::__construct();
	}

	function get_all() {
		return $this->db->query('SELECT * FROM barangay_business_clearances')->result();
	}

	function get($id) {
		return $this->db->query('SELECT * FROM barangay_business_clearances WHERE id=' . $id)->row();
	}

	function add($person_id, $business_name, $business_address, $business_type) {
		$this->db->insert('barangay_business_clearances', array(
			'person_id' => $person_id,
			'business_name' => $business_name,
			'business_address' => $business_address,
			'business_type' => $business_type,
			'date_issued' => date('Y-m-d H:i:s'),
			'created_at' => date('Y-m-d H:i:s')
		));

		return $this->db->insert_id();
	}
}