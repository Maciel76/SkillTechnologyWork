<template>
  <footer class="footer">
    <div class="container">
      <div class="footer-content">
        <div class="footer-about">
          <h3>Instituto Educar</h3>
          <p>
            Transformando vidas através da educação de qualidade desde 2005.
          </p>
          <div class="social-links">
            <a href="#">
              <img
                src="https://api.iconify.design/logos:facebook.svg"
                alt="Facebook"
              />
            </a>
            <a href="#">
              <img
                src="https://api.iconify.design/skill-icons:instagram.svg"
                alt="Instagram"
              />
            </a>
            <a href="#">
              <img
                src="https://api.iconify.design/devicon:twitter.svg"
                alt="Twitter"
              />
            </a>
            <a href="#">
              <img
                src="https://api.iconify.design/logos:youtube-icon.svg"
                alt="YouTube"
              />
            </a>
          </div>
        </div>
        <div class="footer-links">
          <h4>Links Rápidos</h4>
          <ul>
            <li><a href="#home">Home</a></li>
            <li><a href="#features">Nossa Escola</a></li>
            <li><a href="#gallery">Galeria</a></li>
            <li><a href="#admission">Matrículas</a></li>
            <li><a href="#events">Eventos</a></li>
            <li><a href="#">Área do Aluno</a></li>
          </ul>
        </div>
        <div class="footer-contact">
          <h4>Contato</h4>
          <ul>
            <li>
              <i class="fas fa-map-marker-alt"></i> Rua da Educação, 123 -
              Centro
            </li>
            <li><i class="fas fa-phone"></i> (11) 1234-5678</li>
            <li><i class="fas fa-envelope"></i> contato@institutoeducar.com</li>
            <li><i class="fas fa-clock"></i> Seg-Sex: 7h30 às 18h</li>
          </ul>
        </div>
      </div>
      <div class="footer-bottom">
        <p>&copy; 2023 Instituto Educar. Todos os direitos reservados.</p>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: "FooterEducar",
};
</script>

<style scoped>
.footer {
  background: var(--primary-color);
  color: white;
  padding: 60px 0 0;
}

.footer-content {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 40px;
  margin-bottom: 40px;
}

.footer-about h3 {
  font-size: 1.5rem;
  margin-bottom: 20px;
}

.footer-about p {
  opacity: 0.8;
  margin-bottom: 20px;
}

.social-links {
  display: flex;
  gap: 15px;
}

.social-links a {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;

  border-radius: 50%;
  color: white;
  transition: all 0.3s ease;
}
.social-links img {
  width: 40px;
  height: 40px;
}

.social-links a:hover {
  transform: translateY(-3px);
}

.footer-links h4,
.footer-contact h4 {
  font-size: 1.2rem;
  margin-bottom: 20px;
  position: relative;
  padding-bottom: 10px;
}

.footer-links h4::after,
.footer-contact h4::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  width: 50px;
  height: 2px;
  background: var(--secondary-color);
}

.footer-links ul,
.footer-contact ul {
  list-style: none;
}

.footer-links li,
.footer-contact li {
  margin-bottom: 10px;
}

.footer-links a {
  color: white;
  opacity: 0.8;
  text-decoration: none;
  transition: opacity 0.3s ease;
}

.footer-links a:hover {
  opacity: 1;
}

.footer-contact i {
  margin-right: 10px;
  color: var(--secondary-color);
  width: 20px;
  text-align: center;
}

.footer-bottom {
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  padding-top: 20px;
  text-align: center;
  opacity: 0.7;
  font-size: 0.9rem;
}
</style>
