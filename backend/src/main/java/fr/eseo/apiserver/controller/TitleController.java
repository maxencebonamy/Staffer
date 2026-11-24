package fr.eseo.apiserver.controller;

import fr.eseo.apiserver.model.Title;
import fr.eseo.apiserver.service.TitleService;
import fr.eseo.apiserver.validator.title.CreateTitleRequest;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/v1.0/employees/{id}/titles")
@Tag(name = "titles")
public class TitleController {

	@Autowired
	private TitleService titleService;

	@GetMapping
	public ResponseEntity<List<Title>> getAllTitles(@PathVariable int id) {
		var titles = titleService.getAllTitles(id);
		return ResponseEntity.ok(titles);
	}

	@GetMapping("/last")
	public ResponseEntity<Title> getTitle(@PathVariable int id) {
		var title = titleService.getLastTitle(id);
		if (title == null) {
			return ResponseEntity.notFound().build();
		}
		return ResponseEntity.ok(title);
	}

	@GetMapping("/{fromDate}")
	public ResponseEntity<Title> getTitle(@PathVariable int id, @PathVariable @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate fromDate) {
		var title = titleService.getTitle(id, fromDate);
		if (title == null) {
			return ResponseEntity.notFound().build();
		}
		return ResponseEntity.ok(title);
	}

	@PostMapping
	public ResponseEntity<Title> createTitle(@PathVariable int id, @Valid @RequestBody CreateTitleRequest body) {
		try {
			var newTitle = titleService.createTitle(id, body.fromDate(), body.title());
			return ResponseEntity.ok(newTitle);
		} catch (IllegalArgumentException e) {
			return ResponseEntity.badRequest().build();
		}
	}

}
