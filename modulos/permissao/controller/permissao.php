<?php
namespace Controller;

use Libs;

class Permissao extends \Framework\ControllerCrud {

	protected $modulo = [
		'modulo' 	=> 'permissao',
		'name'		=> 'Permissões',
		'send'		=> 'Permissão'
	];

	protected $datatable = [
		'colunas' => ['ID', 'Modulo', 'Permissão', 'Ações'],
		'select'  => ['id', 'id_modulo', 'permissao'],
		'from'    => 'permissao',
		'search'  => ['id', 'id_modulo', 'permissao']
	];

	public function index() {
		\Libs\Auth::handLeLoggin();
		\Libs\Permission::check($this->modulo['modulo'], "visualizar");

		$this->view->assign('permissao_criar', \Libs\Permission::check_user_permission($this->modulo['modulo'], 'criar'));

		if(isset($this->datatable) && !empty($this->datatable)){
			$this->view->set_colunas_datatable($this->datatable['colunas']);
		}

		$this->view->assign('modulos', $this->model->load_active_list('modulo'));
		$this->view->render('back/cabecalho_rodape_sidebar', $this->modulo['modulo'] . '/view/listagem/listagem');
	}

	public function editar($id) {
		\Libs\Auth::handLeLoggin();
		\Libs\Permission::check($this->modulo['modulo'], "editar");

		$this->check_if_exists($id[0]);

		$this->view->assign('modulos', $this->model->load_active_list('modulo'));
		$this->view->assign('cadastro', $this->model->full_load_by_id($this->modulo['modulo'], $id[0])[0]);
		$this->view->render('back/cabecalho_rodape_sidebar', $this->modulo['modulo'] . '/view/form/form');
	}

	public function visualizar($id){
		\Libs\Auth::handLeLoggin();
		\Libs\Permission::check($this->modulo['modulo'], "visualizar");

		$this->check_if_exists($id[0]);

		$this->view->assign('modulos', $this->model->load_active_list('modulo'));
		$this->view->assign('cadastro', $this->model->full_load_by_id($this->modulo['modulo'], $id[0])[0]);

		$this->view->lazy_view();
		$this->view->render('back/cabecalho_rodape_sidebar', $this->modulo['modulo'] . '/view/form/form');
	}

	protected function carregar_dados_listagem_ajax($busca){
		$query = $this->model->carregar_listagem($busca, $this->datatable);

		$retorno = [];

		foreach ($query as $indice => $item) {
			$retorno[] = [
				$item['id'],
				$item['modulo'][0]['nome'],
				$item['permissao'],
				$this->view->default_buttons_listagem($item['id'], true, true, true)
			];
		}

		return $retorno;
	}
}