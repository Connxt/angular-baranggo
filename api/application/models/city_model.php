<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class City_Model extends CI_Model {
	function __construct() {
		parent::__construct();
	}

	function get_all() {
		return $this->db->query('SELECT * FROM cities')->result();
	}

	function get($id) {
		return $this->db->query('SELECT * FROM cities WHERE id=' . $id)->row();
	}
}