<?php
defined('BASEPATH') OR exit('No direct script access allowed');
require(APPPATH . "/libraries/REST_Controller.php");

class Censuses extends REST_Controller {
	public function __construct() {
		parent::__construct();

		$this->load->model('census_model');
	}

	public function get_all_censuses_post() {
		echo json_encode($this->census_model->get_all_censuses());
	}

	public function add_census_post() {
		
	}
}
