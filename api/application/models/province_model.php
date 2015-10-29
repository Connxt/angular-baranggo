<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Province_Model extends CI_Model {
	function __construct() {
		parent::__construct();
	}

	function get_all() {
		return $this->db->query('SELECT * FROM provinces')->result();
	}

	function get($id) {
		return $this->db->query('SELECT * FROM provinces WHERE id=' . $id)->row();
	}
}