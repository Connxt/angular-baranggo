<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Setting_Model extends CI_Model {
	function __construct() {
		parent::__construct();
	}

	function get() {
		return $this->db->query('SELECT * FROM settings')->row();
	}

	function add($barangay_id) {
		$this->db->insert('settings', array(
			'barangay_id' => $barangay_id
		));
	}

	function update($barangay_id){
		$this->db->update('settings', array(
			'barangay_id' => $barangay_id
		));	
	}
}