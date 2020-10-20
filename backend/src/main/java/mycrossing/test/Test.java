package mycrossing.test;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "http://localhost:4200", maxAge = 3600)
@SpringBootApplication
@RestController
public class Test {

	public static void main(String[] args) {
		SpringApplication.run(Test.class, args);
	}

	@GetMapping("/hello")
	public String nombreSitio() {
		return "MyCrossing TFG";
	}
}