<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Certificate_Of_Closure_Model extends CI_Model {
	function __construct() {
		parent::__construct();
	}

	function get_all() {
		return $this->db->query('SELECT * FROM certificates_of_closure')->result();
	}

	function get($id) {
		return $this->db->query('SELECT * FROM certificates_of_closure WHERE id=' . $id)->row();
	}

	function add($person_id, $business_name, $business_address, $date_closed) {
		$this->db->insert('certificates_of_closure', array(
			'person_id' => $person_id,
			'business_name' => $business_name,
			'business_address' => $business_address,
			'date_closed' => $date_closed,
			'date_issued' => date('Y-m-d H:i:s'),
			'created_at' => date('Y-m-d H:i:s')
		));

		return $this->db->insert_id();
	}
}