package com.example.powervoice.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.example.powervoice.model.User;
import com.example.powervoice.repository.UserRepository;

@Service
public class UserService implements ICrudService<User>, UserDetailsService {

    private final UserRepository repo;

    @Autowired
    public UserService(UserRepository repo){
        this.repo = repo;
    }

    private User removePassword(User usuario) {
        usuario.setPassword(null);
        return usuario;
    }

    private List<User> removePassword(List<User> usuarios) {
        usuarios.forEach(item -> removePassword(item));
        return usuarios;
    }

    @Override
    public List<User> getAll() {
        List<User> registros = repo.findAll();
        registros = removePassword(registros);
        return registros;       
    }
    public Page<List<User>> getAllPageable(int page, int size) {
        PageRequest pageRequest = PageRequest.of(page, size);
        Page<List<User>> registros = repo.findPageable(pageRequest);

        return registros;
      }

    @Override
    public User getById(Long id) {
        User registro = repo.findById(id).orElse(null);
        registro = removePassword(registro);
        return registro;
    }

    public User getByUserName(String username) {
        User user = repo.findByUsername(username);
        return user;
    }

    public User getByEmail(String email) {

        User usuario = repo.findByEmail(email);
        return usuario;

    }
    
    public boolean checkEmail(String email) {
//        User user =repo.findByEmail(email);
//        if (user == null)
//            return false;
//        return true;
        return repo.findByEmail(email) != null;
    }

    public boolean checkUsername(String username) {
        User user =repo.findByUsername(username);
        if (user == null)
            return false;
        return true;
    }

    @Override
    public Page<List<User>> getByAll(String termoBusca, int page, int size) {
        PageRequest pageRequest = PageRequest.of(page, size);
        Page<List<User>> registros = repo.findByAll(termoBusca, pageRequest);
        return registros;
    }

    @Override
    public User save(User objeto) {
        if (objeto.getPassword() == null) {
            User usuario = repo.findById(objeto.getId()).orElse(null);
            if (usuario != null) {
                objeto.setPassword(usuario.getPassword(), false);
            }
        }
        return repo.save(objeto);    }

    @Override
    public void delete(Long id) {
        repo.deleteById(id);
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return this.getByUserName(username);
    }



//    private User checkUserAndEmail(String termo) {
//       User user = repo.findByUserNameOrEmail(termo);
//    }
}
