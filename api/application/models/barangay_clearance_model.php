<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Barangay_Clearance_Model extends CI_Model {
	function __construct() {
		parent::__construct();
	}

	function get_all() {
		return $this->db->query('SELECT * FROM barangay_clearances')->result();
	}

	function get($id) {
		return $this->db->query('SELECT * FROM barangay_clearances WHERE id=' . $id)->row();
	}

	function add($person_id, $reason, $remarks, $date_issued, $created_at) {
		$this->db->insert('barangay_clearances', array(
			'person_id' => $person_id,
			'reason' => $reason,
			'remarks' => $remarks,
			'date_issued' => date('Y-m-d H:i:s'),
			'created_at' => date('Y-m-d H:i:s')
		));

		return $this->db->insert_id();
	}
}