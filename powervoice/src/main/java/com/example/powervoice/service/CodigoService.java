package com.example.powervoice.service;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import com.example.powervoice.email.Email;
import com.example.powervoice.email.EmailService;
import com.example.powervoice.model.Codigo;
import com.example.powervoice.model.User;
import com.example.powervoice.repository.CodigoRepository;

@Service
public class CodigoService implements ICrudService<Codigo> {

    private final CodigoRepository repo;
    private final EmailService servicoEmail;

    public CodigoService (CodigoRepository repo, EmailService servicoEmail) {
        this.repo = repo;
        this.servicoEmail = servicoEmail;
    }

    @Override
    public List<Codigo> getAll() {
        List<Codigo> registros = repo.findAll();
        return registros;
    }

    public Codigo getByUser(User user) {
        Codigo registro = repo.findByUser(user);
        return registro;
    }

    @Override
    public Codigo getById(Long id) {
        Codigo registro = repo.findById(id).orElse(null);
        return registro;
    }

    public void sendEmail(User usuario, Codigo codigo) {
        Email email = new Email();
        email.setPara(usuario.getEmail());
        email.setTitutlo("Redefinição de Senha");

        String mensagem = "Link de Acesso: http://localhost:9000/redefine/user/"+usuario.getId()+"/code/"+codigo.getCodigo();

        repo.save(codigo);

        email.setMensagem(mensagem);

        servicoEmail.setEmail(email);
        servicoEmail.enviar();
    }

    public Codigo getByUserAndCodigo(User usuario, Integer codigo) {
        Codigo registro = repo.findByUserAndCodigo(usuario, codigo);
        return registro;
    }

    @Override
    public Page<List<Codigo>> getByAll(String termoBusca, int page, int size) {
        // TODO Auto-generated method stub
        return null;
    }

    @Override
    public Codigo save(Codigo objeto) {
        return repo.save(objeto);
    }

    @Override
    public void delete(Long id) {
        repo.deleteById(id);;
        
    }
    
}
