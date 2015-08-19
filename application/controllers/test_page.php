<?php
defined('BASEPATH') OR exit('No direct script access allowed');
require(APPPATH . "/libraries/REST_Controller.php");

class Test_page extends REST_Controller {
	public function __construct() {
		parent::__construct();

		$this->load->model('census_model');
	}

	public function index_get() {
		$data['current_controller'] = 'test_page';
		$this->load->view('test_page/index', $data);
	}

	public function get_sample_output_get() {
		echo json_encode($this->census_model->get_all_censuses());
	}

	public function add_person_post() {
		$this->census_model->add_person(
			$this->post('lastName'),
			$this->post('firstName'),
			$this->post('middleName')
		);
	}
}
