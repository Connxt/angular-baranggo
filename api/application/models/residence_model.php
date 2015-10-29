<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Residence_Model extends CI_Model {
	function __construct() {
		parent::__construct();
	}

	function get_all() {
		return $this->db->query('SELECT * FROM residences')->result();
	}

	function get($id) {
		return $this->db->query('SELECT * FROM residences WHERE id=' . $id)->row();
	}

	function add($block_no, $lot_no, $street, $subdivision, $latitude, $longitude, $barangay_id, $brgy, $city, $province, $code, $zip, $sitio) {
		$this->db->insert('residences', array(
			'block_no' => $block_no,
			'lot_no' => $lot_no,
			'street' => $street,
			'subdivision' => $subdivision,
			// 'latitude' => $latitude,
			// 'longitude' => $longitude,
			// 'barangay_id' => $barangay_id,
			'brgy' => $brgy,
			'city' => $city,
			'province' => $province,
			'zip' => $zip,
			'sitio' => $sitio,
			// 'code' => $code,
			'created_at' => date('Y-m-d H:i:s')
		));

		return $this->db->insert_id();
	}
}