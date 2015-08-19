<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Test_page extends CI_Controller {
	public function index() {
		$this->load->view('test_page/index');
	}
}
