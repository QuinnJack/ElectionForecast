import { useState } from "react";
import Header from "../components/ui/Header";
import Example from "../components/ui/Pie";
import CorrelationMap from "../components/charts/CorrelationMap";
import ButtonShapeHoverTabs from "../components/ui/ButtonShapeHoverTabs";
import LineSVG from "../components/charts/NumberLine";
import "katex/dist/katex.min.css";
import { BlockMath, InlineMath } from "react-katex";
const rankingsData = {
  "Voter Turnout": [
    "Ontario",
    "British Columbia",
    "Alberta",
    "Quebec",
    "Nova Scotia",
    "Saskatchewan",
    "Manitoba",
    "Newfoundland and Labrador",
    "New Brunswick",
    "Prince Edward Island",
    "Northwest Territories",
    "Yukon",
    "Nunavut",
  ],
  "GDP Growth": [
    "Alberta",
    "Ontario",
    "British Columbia",
    "Quebec",
    "Saskatchewan",
    "Manitoba",
    "Nova Scotia",
    "New Brunswick",
    "Newfoundland and Labrador",
    "Prince Edward Island",
    "Northwest Territories",
    "Yukon",
    "Nunavut",
  ],
  "Educational Services": [
    "Quebec",
    "Ontario",
    "British Columbia",
    "Nova Scotia",
    "Alberta",
    "Manitoba",
    "Newfoundland and Labrador",
    "New Brunswick",
    "Saskatchewan",
    "Prince Edward Island",
    "Northwest Territories",
    "Yukon",
    "Nunavut",
  ],
  "Income Levels": [
    "British Columbia",
    "Alberta",
    "Ontario",
    "Quebec",
    "Manitoba",
    "Saskatchewan",
    "Nova Scotia",
    "New Brunswick",
    "Newfoundland and Labrador",
    "Prince Edward Island",
    "Northwest Territories",
    "Yukon",
    "Nunavut",
  ],
  "Demographic Similarity": [
    "Ontario",
    "Quebec",
    "British Columbia",
    "Alberta",
    "Nova Scotia",
    "New Brunswick",
    "Saskatchewan",
    "Manitoba",
    "Newfoundland and Labrador",
    "Prince Edward Island",
    "Northwest Territories",
    "Yukon",
    "Nunavut",
  ],
  "Incumbent Approval": [
    "Nunavut",
    "British Columbia",
    "Ontario",
    "Alberta",
    "Nova Scotia",
    "Manitoba",
    "Saskatchewan",
    "Newfoundland and Labrador",
    "New Brunswick",
    "Prince Edward Island",
    "Northwest Territories",
    "Yukon",
    "Quebec",
  ],
  BC: [
    "British Columbia",
    "Yukon",
    "Ontario",
    "Alberta",
    "Manitoba",
    "Saskatchewan",
    "Quebec",
    "Newfoundland and Labrador",
    "New Brunswick",
    "Prince Edward Island",
    "Nova Scotia",
    "Nunavut",
    "Northwest Territories",
  ],
  YT: [
    "Yukon",
    "British Columbia",
    "Alberta",
    "Northwest Territories",
    "Ontario",
    "Saskatchewan",
    "Manitoba",
    "Quebec",
    "Newfoundland and Labrador",
    "New Brunswick",
    "Prince Edward Island",
    "Nova Scotia",
    "Nunavut",
  ],
  NT: [
    "Northwest Territories",
    "Yukon",
    "Nunavut",
    "Alberta",
    "Saskatchewan",
    "British Columbia",
    "Ontario",
    "Manitoba",
    "Quebec",
    "Newfoundland and Labrador",
    "New Brunswick",
    "Prince Edward Island",
    "Nova Scotia",
  ],
  AB: [
    "Alberta",
    "Saskatchewan",
    "British Columbia",
    "Manitoba",
    "Ontario",
    "Yukon",
    "Quebec",
    "Newfoundland and Labrador",
    "New Brunswick",
    "Prince Edward Island",
    "Nova Scotia",
    "Nunavut",
    "Northwest Territories",
  ],
  SK: [
    "Saskatchewan",
    "Alberta",
    "Manitoba",
    "British Columbia",
    "Ontario",
    "Yukon",
    "Quebec",
    "Newfoundland and Labrador",
    "New Brunswick",
    "Prince Edward Island",
    "Nova Scotia",
    "Nunavut",
    "Northwest Territories",
  ],
  MB: [
    "Manitoba",
    "Saskatchewan",
    "Alberta",
    "Ontario",
    "British Columbia",
    "Quebec",
    "Yukon",
    "Newfoundland and Labrador",
    "New Brunswick",
    "Prince Edward Island",
    "Nova Scotia",
    "Nunavut",
    "Northwest Territories",
  ],
  NU: [
    "Nunavut",
    "Northwest Territories",
    "Yukon",
    "Alberta",
    "Saskatchewan",
    "Manitoba",
    "British Columbia",
    "Ontario",
    "Quebec",
    "Newfoundland and Labrador",
    "New Brunswick",
    "Prince Edward Island",
    "Nova Scotia",
  ],
  ON: [
    "Ontario",
    "Quebec",
    "British Columbia",
    "Manitoba",
    "Alberta",
    "Saskatchewan",
    "Yukon",
    "Newfoundland and Labrador",
    "New Brunswick",
    "Prince Edward Island",
    "Nova Scotia",
    "Nunavut",
    "Northwest Territories",
  ],
  QC: [
    "Quebec",
    "Ontario",
    "New Brunswick",
    "Newfoundland and Labrador",
    "Prince Edward Island",
    "Nova Scotia",
    "British Columbia",
    "Alberta",
    "Saskatchewan",
    "Manitoba",
    "Yukon",
    "Nunavut",
    "Northwest Territories",
  ],
  NL: [
    "Newfoundland and Labrador",
    "Nova Scotia",
    "New Brunswick",
    "Prince Edward Island",
    "Quebec",
    "Ontario",
    "Alberta",
    "British Columbia",
    "Saskatchewan",
    "Manitoba",
    "Yukon",
    "Nunavut",
    "Northwest Territories",
  ],
  NB: [
    "New Brunswick",
    "Prince Edward Island",
    "Nova Scotia",
    "Quebec",
    "Newfoundland and Labrador",
    "Ontario",
    "Alberta",
    "British Columbia",
    "Saskatchewan",
    "Manitoba",
    "Yukon",
    "Nunavut",
    "Northwest Territories",
  ],
  NS: [
    "Nova Scotia",
    "Newfoundland and Labrador",
    "New Brunswick",
    "Prince Edward Island",
    "Quebec",
    "Ontario",
    "Alberta",
    "British Columbia",
    "Saskatchewan",
    "Manitoba",
    "Yukon",
    "Nunavut",
    "Northwest Territories",
  ],
  PE: [
    "Prince Edward Island",
    "Nova Scotia",
    "New Brunswick",
    "Newfoundland and Labrador",
    "Quebec",
    "Ontario",
    "Alberta",
    "British Columbia",
    "Saskatchewan",
    "Manitoba",
    "Yukon",
    "Nunavut",
    "Northwest Territories",
  ],
};

const tabs = [
  { text: "Voter Turnout", value: "Voter Turnout" },
  { text: "GDP Growth", value: "GDP Growth" },
  { text: "Income Levels", value: "Income Levels" },
  { text: "Demographic Similarity", value: "Demographic Similarity" },
  { text: "Incumbent Approval", value: "Incumbent Approval" },
];

const provincesAndTerritories = [
  { text: "BC", value: "BC" },
  { text: "YT", value: "YT" },
  { text: "NT", value: "NT" },
  { text: "AB", value: "AB" },
  { text: "SK", value: "SK" },
  { text: "MB", value: "MB" },
  { text: "NU", value: "NU" },
  { text: "ON", value: "ON" },
  { text: "QC", value: "QC" },
  { text: "NL", value: "NL" },
  { text: "NB", value: "NB" },
  { text: "NS", value: "NS" },
  { text: "PE", value: "PE" },
];

function Methodology() {
  const [activeChart, setActiveChart] = useState("Voter Turnout");
  const [activeProvince, setActiveProvince] = useState("ON");

  const handleProvinceHover = (province) => {
    setActiveProvince(province);
    setActiveChart(province);
  };

  return (
    <div>
      <Header />
      <div className="font-sans p-8 relative mx-auto">
        <div className="max-w-4xl mx-auto mb-8">
          <h1 className="text-7xl text-center font-editorial text-gray-800">
            Methodology
          </h1>
          <br />
          <p className="text-center text-2xl font-degular font-light text-gray-500">
            An examination of the methods and approaches used in forecasting
            upcoming elections.
          </p>
          <br />

          <br />

          <div>
            <br />{" "}
            <h2 className="text-4xl text-left font-editorial-light text-gray-800">
              1. Understanding the Canadian Political Landscape
            </h2>
            <br />{" "}
            <p className="text-left font-degular text-lg text-gray-600">
              To forecast elections in Canada, we first need to grasp the basics
              of its political system. Canada currently uses a
              First-Past-The-Post (FPTP) voting system across 338
              constituencies, also known as ridings. In each riding, the
              candidate with the most votes wins, regardless of whether they
              secure a majority. This system can lead to interesting dynamics
              where a party's overall popular vote doesn't always directly
              translate to the number of seats they win.
            </p>
            <p className="text-left font-degular text-lg text-gray-600">
              Our foundational model starts by mapping out the current political
              situation. We represent the set of all ridings as{" "}
              <InlineMath math="\color{#5b6573} \small R = \{r_1, r_2, ..., r_{338}\}" />
              , and the set of all political parties as{" "}
              <InlineMath math="\color{#5b6573} \small P = \{p_1, p_2, ..., p_n\}" />
              .
            </p>
            <p className="text-left font-degular text-lg text-gray-600">
              For each riding <InlineMath math="\color{#5b6573} \small r_i" />{" "}
              and party <InlineMath math="\color{#5b6573} \small p_j" />, we
              define:
            </p>
            <ul>
              <li class="text-left font-degular text-lg text-gray-600">
                <InlineMath math="\small v_{ij}" />: The number of votes for
                party
                <InlineMath math="\small p_j" /> in riding{" "}
                <InlineMath math="\small r_i" />
              </li>
              <li class="text-left font-degular text-lg text-gray-600">
                <InlineMath math="\small s_i" />: The winning party in riding{" "}
                <InlineMath math="\small r_i" />
              </li>
            </ul>
            <p className="text-left font-degular text-lg text-gray-600">
              The winner in each riding is determined by:
            </p>
            <BlockMath math="\color{#5b6573} s_i = \argmax_{p_j \in P} v_{ij}" />
            <p className="text-left font-degular text-lg text-gray-600">
              The total seats for a party{" "}
              <InlineMath math="\color{#5b6573} \small p_j" /> is then
              calculated as:
            </p>
            <BlockMath math="\color{#5b6573} S_j = \sum_{i=1}^{338} \mathbb{1}(s_i = p_j)" />
            <p className="text-left font-degular text-lg text-gray-600">
              where <InlineMath math="\color{#5b6573} \small \mathbb{1}" /> is
              the indicator function. This baseline helps us understand the
              starting point for our predictions.
            </p>
            <br />{" "}
            <h2 className="text-4xl text-left font-editorial-light text-gray-800">
              2. Making Sense of Polling Data
            </h2>
            <br />{" "}
            <p className="text-left font-degular text-lg text-gray-600">
              Polls are a crucial part of election forecasting, but they're not
              as straightforward as they might seem. Instead of just taking poll
              numbers at face value, we use a more nuanced approach.
            </p>
            <p className="text-left font-degular text-lg text-gray-600">
              We consider factors like how recent a poll is and how many people
              were surveyed. Let{" "}
              <InlineMath math="\color{#5b6573} \small Q = \{q_1, q_2, ..., q_m\}" />{" "}
              be the set of polls, where each poll{" "}
              <InlineMath math="\color{#5b6573} \small q_k" />
              has a sample size <InlineMath math="\color{#5b6573} \small n_k" />{" "}
              and a date <InlineMath math="\color{#5b6573} \small t_k" />.
            </p>
            <p className="text-left font-degular text-lg text-gray-600">
              More recent polls and those with larger sample sizes are given
              more weight in our calculations. We define a weight{" "}
              <InlineMath math="\color{#5b6573} \small w_k" /> for each poll
              based on its recency and sample size:
            </p>
            <BlockMath math="\color{#5b6573} w_k = \frac{n_k}{\sum_{l=1}^m n_l} \cdot e^{-\lambda(t_\text{current} - t_k)}" />
            <p className="text-left font-degular text-lg text-gray-600">
              where <InlineMath math="\color{#5b6573} \small \lambda" /> is a
              decay parameter.
            </p>
            <p className="text-left font-degular text-lg text-gray-600">
              The weighted polling average for party{" "}
              <InlineMath math="\color{#5b6573} \small p_j" /> is then
              calculated as:
            </p>
            <BlockMath math="\color{#5b6573} \bar{p}_j = \frac{\sum_{k=1}^m w_k p_{jk}}{\sum_{k=1}^m w_k}" />
            <p className="text-left font-degular text-lg text-gray-600">
              This weighted average gives us a more accurate picture of where
              public opinion stands at any given moment, allowing us to capture
              the most current trends while still considering the broader
              context of public opinion over time.
            </p>
            <br />{" "}
            <h2 className="text-4xl text-left font-editorial-light text-gray-800">
              3. Dealing with Uncertainty
            </h2>
            <br />{" "}
            <p className="text-left font-degular text-lg text-gray-600">
              Polls aren't perfect, and it's crucial to understand how much
              uncertainty is in our predictions. We use a sophisticated
              statistical method called Bayesian inference to quantify this
              uncertainty.
            </p>
            <p className="text-left font-degular text-lg text-gray-600">
              We model the true support{" "}
              <InlineMath math="\color{#5b6573} \small \theta_j" /> for party{" "}
              <InlineMath math="\color{#5b6573} \small p_j" />
              as a random variable with a Beta prior:
            </p>
            <BlockMath math="\color{#5b6573} \theta_j \sim \text{Beta}(\alpha_j, \beta_j)" />
            <p className="text-left font-degular text-lg text-gray-600">
              After observing poll data, we update to the posterior
              distribution:
            </p>
            <BlockMath math="\color{#5b6573} \theta_j | \text{data} \sim \text{Beta}(\alpha_j + \sum_{k=1}^m n_k p_{jk}, \beta_j + \sum_{k=1}^m n_k (1-p_{jk}))" />
            <p className="text-left font-degular text-lg text-gray-600">
              This approach allows us to provide a range of likely outcomes for
              each party, rather than a single point estimate. For example, we
              might predict that Party A is likely to win between 120 and 150
              seats, with 135 being the most probable outcome. This method gives
              a much more comprehensive picture of what we know and don't know
              about the upcoming election.
            </p>
            <br />{" "}
            <h2 className="text-4xl text-left font-editorial-light text-gray-800">
              4. Incorporating Historical Trends and Other Factors
            </h2>
            <br />{" "}
            <p className="text-left font-degular text-lg text-gray-600">
              Elections aren't just about current polls; history and context
              matter too. We use what political scientists call "fundamentals"
              to refine our predictions. These include factors like:
            </p>
            <ul class="text-left font-degular text-lg text-gray-600">
              <li>
                The "incumbency advantage" (sitting MPs often have an edge in
                getting re-elected)
              </li>
              <li>How a riding has voted in past elections</li>
              <li>Economic indicators like unemployment rates or GDP growth</li>
              <li>Approval ratings of party leaders</li>
              <li>Demographic changes in ridings</li>
            </ul>
            <p className="text-left font-degular text-lg text-gray-600">
              We create a complex model that takes all these factors into
              account. For each riding{" "}
              <InlineMath math="\color{#5b6573} \small r_i" /> and party{" "}
              <InlineMath math="\color{#5b6573} \small p_j" />, we model the
              vote share <InlineMath math="\color{#5b6573} \small y_{ij}" /> as:
            </p>
            <BlockMath math="\color{#5b6573} y_{ij} = \mu_j + \alpha_i + \beta_j x_i + \epsilon_{ij}" />
            <p className="text-left font-degular text-lg text-gray-600">
              where:
            </p>
            <ul class="text-left font-degular text-lg text-gray-600">
              <li>
                <InlineMath math="\color{#5b6573} \small \mu_j" /> is the
                national effect for party{" "}
                <InlineMath math="\color{#5b6573} \small p_j" />
              </li>
              <li>
                <InlineMath math="\color{#5b6573} \small \alpha_i" /> is the
                riding-specific effect
              </li>
              <li>
                <InlineMath math="\color{#5b6573} \small x_i" /> is a vector of
                riding-level covariates (e.g., demographics, past results)
              </li>
              <li>
                <InlineMath math="\color{#5b6573} \small \beta_j" /> is a vector
                of party-specific coefficients
              </li>
              <li>
                <InlineMath math="\color{#5b6573} \small \epsilon_{ij} \sim N(0, \sigma^2)" />{" "}
                is the error term
              </li>
            </ul>
            <p className="text-left font-degular text-lg text-gray-600">
              This comprehensive approach helps us capture subtleties that
              simple poll averages might miss, providing a more nuanced
              prediction of election outcomes.
            </p>
            <br />{" "}
            <h2 className="text-4xl text-left font-editorial-light text-gray-800">
              5. Understanding Regional Connections
            </h2>
            <br />{" "}
            <p className="text-left font-degular text-lg text-gray-600">
              Political trends often spill across riding and even provincial
              boundaries. A shift in opinion in downtown Toronto might signal
              similar changes in other urban centers across Canada. Likewise,
              rural areas often show connected patterns of political behavior.
            </p>
            <p className="text-left font-degular text-lg text-gray-600">
              To capture these connections, we use advanced statistical
              techniques that look at how changes in one area might relate to
              changes in similar areas. Let{" "}
              <InlineMath math="\color{#5b6573} \small f_j(\mathbf{x})" /> be
              the latent function representing the support for party{" "}
              <InlineMath math="\color{#5b6573} \small p_j" />
              at location{" "}
              <InlineMath math="\color{#5b6573} \small \mathbf{x}" />. We model
              this as a Gaussian Process (GP):
            </p>
            <BlockMath math="\color{#5b6573} f_j(\mathbf{x}) \sim \mathcal{GP}(m(\mathbf{x}), k(\mathbf{x}, \mathbf{x}'))" />
            <p className="text-left font-degular text-lg text-gray-600">
              where <InlineMath math="\color{#5b6573} \small m(\mathbf{x})" />{" "}
              is the mean function and{" "}
              <InlineMath math="\color{#5b6573} \small k(\mathbf{x}, \mathbf{x}')" />{" "}
              is the covariance function. A common choice is the squared
              exponential kernel:
            </p>
            <BlockMath math="\color{#5b6573} k(\mathbf{x}, \mathbf{x}') = \sigma_f^2 \exp\left(-\frac{1}{2l^2}||\mathbf{x} - \mathbf{x}'||^2\right)" />
            <p className="text-left font-degular text-lg text-gray-600">
              This approach views the political landscape as an interconnected
              network rather than isolated points, making more informed
              predictions about areas with less polling data by using
              information from similar regions.
            </p>
            <br />{" "}
            <h2 className="text-4xl text-left font-editorial-light text-gray-800">
              6. Smoothing Out Local Variations
            </h2>
            <br />{" "}
            <p className="text-left font-degular text-lg text-gray-600">
              Finally, we use a technique called Locally Estimated Scatterplot
              Smoothing (LOESS). This method helps us understand how political
              support varies across geographic areas, even when we don't have
              specific data for every location.
            </p>
            <p className="text-left font-degular text-lg text-gray-600">
              Our enhanced LOESS technique allows us to estimate support levels
              in areas where we don't have polls by looking at nearby areas and
              areas with similar characteristics. For each location{" "}
              <InlineMath math="\color{#5b6573} \small \mathbf{x}" />, we
              estimate:
            </p>
            <BlockMath math="\color{#5b6573} y(\mathbf{x}) = \beta_0(\mathbf{x}) + \sum_{k=1}^p \beta_k(\mathbf{x}) x_k + \epsilon" />
            <p className="text-left font-degular text-lg text-gray-600">
              The coefficients{" "}
              <InlineMath math="\color{#5b6573} \small \beta_k(\mathbf{x})" />{" "}
              are estimated using weighted least squares, with weights
              determined by a spatial kernel:
            </p>
            <BlockMath math="\color{#5b6573} w_i(\mathbf{x}) = \exp\left(-\frac{d_i^2(\mathbf{x})}{h^2}\right)" />
            <p className="text-left font-degular text-lg text-gray-600">
              This technique is particularly valuable in a country as large and
              diverse as Canada, where conducting polls in every riding is
              impractical. It helps us fill in the gaps in our knowledge and
              create a more complete picture of the electoral landscape.
            </p>
            <br />{" "}
            <h2 className="text-4xl text-left font-editorial-light text-gray-800">
              Conclusion
            </h2>
            <br />{" "}
            <p className="text-left font-degular text-lg text-gray-600">
              It's crucial to remember that even the most advanced models can be
              surprised. Unexpected events, last-minute shifts in public
              opinion, or changes in voter turnout can all lead to outcomes that
              differ from predictions. The goal of these models isn't to predict
              the future with certainty, but to provide the best possible
              understanding of the electoral landscape based on all available
              information.
            </p>
            <br></br>
            <p className="text-left font-degular text-lg text-gray-600">
              As we continue to refine these techniques, the challenge lies in
              balancing complexity with clarity, and in effectively
              communicating both our predictions and the uncertainty surrounding
              them to the public. In doing so, we can contribute to a more
              informed democratic process, helping voters, analysts, and
              decision-makers better understand the dynamics of Canadian
              elections.
            </p>
          </div>
          <br />
        </div>
        <div className="flex justify-center mb-0 mx-24">
          <LineSVG />
        </div>
        <div className="flex justify-center">
          <ButtonShapeHoverTabs
            tabs={tabs}
            activeTab={activeChart}
            onTabChange={(value) => setActiveChart(value)}
            type="tabs"
          />
        </div>
        <div className="flex justify-center">
          <ButtonShapeHoverTabs
            tabs={provincesAndTerritories}
            activeTab={activeChart}
            onTabChange={(value) => setActiveChart(value)}
            type="provinces"
          />
        </div>
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-center">
            <CorrelationMap
              rankings={rankingsData[activeChart]}
              onProvinceHover={handleProvinceHover}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Methodology;
