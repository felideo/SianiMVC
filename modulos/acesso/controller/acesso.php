<?php
namespace ControllerCore;

class Acesso extends \Framework\Controller{

	protected $modulo = [
		'modulo' 	=> 'acesso',
	];

	public function index($parametros){
		$this->view->render('back/cabecalho_rodape', $this->modulo['modulo'] . '/view/front/login');
	}

	public function entrar(){
		$this->run_front(carregar_variavel('acesso'));
	}

	public function logout() {
		$this->universe->session->destroy();
		header('location: /');
		exit;
	}

	private function run_front($acesso){
		if($this->model->run_front($acesso)){
			$this->view->alert_js('Seja bem vindo!', 'sucesso');
			header('location: /');
			exit;
		}

		$this->view->alert_js('Usúario ou Senha inválido...', 'erro');
		header('location: /acesso');
		exit;
	}

	public function cadastrar(){
		$acesso = carregar_variavel('acesso');
		$bkp_acesso = $acesso;

		$usuario = $this->model->query
			->select('usuario.id, usuario.ativo')
			->from('usuario usuario')
			->where("usuario.email = '{$acesso['usuario']['email']}' AND usuario.ativo = 1")
			->fetchArray()[0];

		if(!empty($usuario) && !empty([$usuario['ativo']])){
			$this->view->alert_js('usuario ja cadastrado no sistema...', 'erro');
			header('location: /acesso');
			exit;
		}

		$hierarquia_usuario_front = $this->model->query
			->select('config.id_hierarquia_usuario_frontend')
			->from('configuracao config')
			->where("id = 1")
			->fetchArray()[0];

		$acesso['usuario']['hierarquia'] = $hierarquia_usuario_front['id_hierarquia_usuario_frontend'];
		$acesso = $this->universe->get_controller('usuario')->insert_update($acesso);

		if(!isset($acesso['status']) || empty($acesso['status'])){
			$this->view->alert_js('Ocorreu um erro ao efetuar o cadastro...', 'erro');
			header('location: /acesso');
			exit;
		}

		$bkp_acesso['email'] = $bkp_acesso['usuario']['email'];
		$bkp_acesso['senha'] = $bkp_acesso['usuario']['senha'];

		$this->run_front($bkp_acesso);
	}

	public function admin($parametros){
		if($this->universe->auth->is_logged(false)){
			header('location: /painel_controle/listagem');
			exit;
		}

		http_response_code(404);
		$this->view->render('back/cabecalho_rodape', $this->modulo['modulo'] . '/view/back/login');
	}

	public function run_back(){
		if($this->model->run_back(carregar_variavel('acesso'))){
			header('location: /painel_controle/listagem');
			exit;
		}

		$this->view->alert_js('Usúario ou Senha inválido...', 'erro');
		header('location: ' . \Libs\Redirect::getUrl());
		exit;
	}
}
