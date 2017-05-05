package io.inconcept.trmntr.cucumber.stepdefs;

import io.inconcept.trmntr.TrmntrApp;

import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.test.web.servlet.ResultActions;

import org.springframework.boot.test.context.SpringBootTest;

@WebAppConfiguration
@SpringBootTest
@ContextConfiguration(classes = TrmntrApp.class)
public abstract class StepDefs {

    protected ResultActions actions;

}
