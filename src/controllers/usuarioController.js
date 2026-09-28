import * as Usuario from "../models/usuarioModel.js";

export async function listar(req, res) {
  try {
    const usuarios = await Usuario.listarUsuarios();
    res.status(200).json(usuarios);
  } catch (err) {
    res.status(500).json({ erro: "Falha ao listar usuários" });
  }
}

export async function criar(req, res) {
  try {
    const { nome, email } = req.body;
    const usuario = await Usuario.criarUsuario(nome, email);
    res.status(201).json(usuario);
  } catch (err) {
    res.status(500).json({ erro: "Falha ao criar usuário" });
  }
}

export async function atualizar(req, res) {
  try {
    const { nome, email } = req.body;
    const afetados = await Usuario.atualizarUsuario(req.params.id, nome, email);
    if (afetados === 0) {
      return res.status(404).json({ erro: "Usuário não encontrado" });
    }
    res.status(200).json({ mensagem: "Atualizado com sucesso" });
  } catch (err) {
    res.status(500).json({ erro: "Falha ao atualizar usuário" });
  }
}

export async function deletar(req, res) {
  try {
    const afetados = await Usuario.deletarUsuario(req.params.id);
    if (afetados === 0) {
      return res.status(404).json({ erro: "Usuário não encontrado" });
    }
    res.status(200).json({ mensagem: "Deletado com sucesso" });
  } catch (err) {
    res.status(500).json({ erro: "Falha ao deletar usuário" });
  }
}