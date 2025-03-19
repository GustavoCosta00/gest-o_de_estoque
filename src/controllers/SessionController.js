const User = require("../models/User");

class SessionController {
  loginForm(req, res) {
    return res.render("login/index");
  }

  logout(req, res) {
    req.session.destroy();
    return res.redirect("/login");
  }

  async store(req, resp) {
    const { email, password } = req.body;

    const user = await User.findOne({ email }); // Busca o usuário pelo email

    if (!user) {
      return resp.render("login/index", {
        user: req.body,
        error: "Usuário não encontrado!",
      });
    }

    if (!(await user.compareHash(password))) {
      // Se a senha estiver errada
      return resp.render("login/index", {
        user: req.body,
        error: "Senha incorreta.",
      });
    }

    if (!user.pagamento) {
      // Se o pagamento não estiver em dia
      return resp.render("login/index", {
        user: req.body,
        error: "Pagamento pendente. Regularize sua conta.",
      });
    }

    req.session.userId = user._id; // Cria a sessão do usuário

    return resp.redirect("/"); // Redireciona após o login
  }
}

module.exports = new SessionController();
