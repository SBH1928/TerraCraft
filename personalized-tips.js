document.addEventListener("DOMContentLoaded", function () {
    // Get query parameters from URL
    const params = new URLSearchParams(window.location.search);
  
    // Extract parameters
    const region = params.get("region") || "";
    const cropType = params.get("cropType") || params.get("crop") || "";
    const experience = params.get("experience") || "";
    const season = params.get("season") || "";
    const soil = params.get("soil") || "";
  
    // Populate summary section
    populateSummary(region, cropType, experience, season, soil);
  
    // Generate and display personalized tips
    generateTips(region, cropType, experience, season, soil);
  });
  
  // Function to populate the summary section
  function populateSummary(region, cropType, experience, season, soil) {
    const summaryDiv = document.getElementById("tips-summary");
  
    let summaryHTML =
      "<p><strong>Region:</strong> " + (region || "Not specified") + "</p>";
    summaryHTML +=
      "<p><strong>Crop:</strong> " + (cropType || "Not specified") + "</p>";
  
    if (experience) {
      summaryHTML +=
        "<p><strong>Experience Level:</strong> " + experience + "</p>";
    }
  
    if (season) {
      summaryHTML += "<p><strong>Growing Season:</strong> " + season + "</p>";
    }
  
    if (soil) {
      summaryHTML += "<p><strong>Soil Type:</strong> " + soil + "</p>";
    }
  
    summaryDiv.innerHTML = summaryHTML;
  }
  
  // Function to generate personalized tips based on parameters
  function generateTips(region, cropType, experience, season, soil) {
    // Generate tips for each section based on the combination of parameters
    const plantingTips = generatePlantingTips(region, cropType, season);
    const soilTips = generateSoilTips(region, cropType, soil);
    const pestTips = generatePestTips(region, cropType, season);
    const waterTips = generateWaterTips(region, cropType, season, soil);
    const harvestTips = generateHarvestTips(cropType, season);
  
    // Populate the tips sections
    populateTipsList("planting-tips", plantingTips);
    populateTipsList("soil-tips", soilTips);
    populateTipsList("pest-tips", pestTips);
    populateTipsList("water-tips", waterTips);
    populateTipsList("harvest-tips", harvestTips);
  }
  
  // Function to populate a tips list with generated tips
  function populateTipsList(elementId, tips) {
    const tipsList = document.getElementById(elementId);
  
    if (!tipsList) return;
  
    let tipsHTML = "";
  
    tips.forEach((tip) => {
      tipsHTML += "<li>" + tip + "</li>";
    });
  
    tipsList.innerHTML = tipsHTML;
  }
  
  // Functions to generate specific tips based on parameters
  function generatePlantingTips(region, cropType, season) {
    const tips = [];
  
    // Base tips that apply to all
    tips.push(
      "Ensure proper spacing between plants to allow for adequate air circulation and growth.",
    );
    tips.push(
      "Plant during the early morning or late evening to minimize transplant shock.",
    );
  
    // Region-specific tips
    if (region) {
      switch (region) {
        case "Chennai":
          tips.push(
            "In Chennai's hot climate, provide shade for young seedlings during the first few weeks.",
          );
          tips.push(
            "Start planting after the northeast monsoon for best results.",
          );
          break;
        case "Coimbatore":
          tips.push(
            "Coimbatore's moderate climate is ideal for most crops. Utilize the full growing season.",
          );
          tips.push(
            "Plant wind-resistant varieties as some areas experience strong winds.",
          );
          break;
        case "Madurai":
          tips.push(
            "In Madurai's hot climate, early morning planting is essential to avoid heat stress.",
          );
          tips.push(
            "Use heat-resistant varieties that can withstand the intense summer temperatures.",
          );
          break;
        case "Salem":
          tips.push(
            "Salem's varied elevation allows for diverse crops. Choose varieties suited to your specific location.",
          );
          tips.push(
            "Terracing techniques work well in hilly areas of Salem for better water retention.",
          );
          break;
        case "Trichy":
          tips.push(
            "In Trichy, prepare raised beds to prevent waterlogging during heavy rains.",
          );
          tips.push(
            "Early planting is recommended to utilize the moderate winter temperatures.",
          );
          break;
        case "Thanjavur":
          tips.push(
            "Thanjavur's fertile soil is excellent for most crops. Focus on proper seed selection.",
          );
          tips.push(
            "Implement crop rotation to maintain the natural fertility of Thanjavur's soil.",
          );
          break;
        case "Erode":
          tips.push(
            "In Erode, use mulching techniques to conserve soil moisture during dry periods.",
          );
          tips.push(
            "Plant drought-resistant varieties as a precaution against occasional water scarcity.",
          );
          break;
        case "Tirunelveli":
          tips.push(
            "Tirunelveli's warm climate requires heat-tolerant varieties for summer planting.",
          );
          tips.push(
            "Utilize the river basin areas for crops that require more water.",
          );
          break;
        default:
          tips.push(
            "Adapt planting times according to your local climate conditions.",
          );
      }
    }
  
    // Crop-specific tips
    if (cropType) {
      if (
        cropType.toLowerCase().includes("vegetable") ||
        cropType.toLowerCase() === "vegetables"
      ) {
        tips.push(
          "For leafy vegetables, successive planting every 2-3 weeks ensures continuous harvest.",
        );
        tips.push(
          "Most vegetables benefit from companion planting with marigolds to deter pests.",
        );
      } else if (
        cropType.toLowerCase().includes("fruit") ||
        cropType.toLowerCase() === "fruits"
      ) {
        tips.push(
          "Fruit trees should be planted with adequate spacing to allow for mature canopy development.",
        );
        tips.push(
          "Consider dwarf varieties for smaller spaces and easier harvesting.",
        );
      } else if (
        cropType.toLowerCase().includes("grain") ||
        cropType.toLowerCase() === "grains"
      ) {
        tips.push(
          "Broadcast seeding works well for most grains, followed by light raking to cover seeds.",
        );
        tips.push(
          "Plant density is crucial for grains - follow specific recommendations for your variety.",
        );
      } else if (
        cropType.toLowerCase().includes("paddy") ||
        cropType.toLowerCase().includes("rice")
      ) {
        tips.push(
          "Prepare seedbeds 1-2 weeks before transplanting for stronger seedlings.",
        );
        tips.push("Maintain 2-3 cm water level during the initial growth stage.");
      } else if (cropType.toLowerCase().includes("tomato")) {
        tips.push(
          "Plant tomatoes deeper than they were in pots to develop stronger root systems.",
        );
        tips.push(
          "Provide support structures like stakes or cages early to avoid root damage later.",
        );
      } else if (cropType.toLowerCase().includes("cotton")) {
        tips.push(
          "Plant cotton when soil temperatures are consistently above 18°C (65°F).",
        );
        tips.push(
          "Proper spacing of 75-100 cm between rows is essential for cotton cultivation.",
        );
      }
    }
  
    // Season-specific tips
    if (season) {
      switch (season) {
        case "Kharif":
          tips.push(
            "For Kharif crops, prepare for heavy rainfall by creating proper drainage channels.",
          );
          tips.push(
            "Consider raised bed planting to prevent waterlogging during monsoon.",
          );
          break;
        case "Rabi":
          tips.push(
            "Rabi season planting benefits from residual moisture, focus on proper soil preparation.",
          );
          tips.push(
            "Protect young plants from occasional winter frost with row covers if needed.",
          );
          break;
        case "Summer":
          tips.push(
            "For summer planting, incorporate extra organic matter to improve water retention.",
          );
          tips.push(
            "Use shade cloth or plant taller crops to provide shade for heat-sensitive varieties.",
          );
          break;
      }
    }
  
    return tips;
  }
  
  function generateSoilTips(region, cropType, soil) {
    const tips = [];
  
    // Base tips that apply to all
    tips.push(
      "Regularly test your soil pH and adjust accordingly for optimal nutrient availability.",
    );
    tips.push(
      "Apply organic compost before planting to improve soil structure and fertility.",
    );
  
    // Soil-specific tips
    if (soil) {
      switch (soil) {
        case "Red Soil":
          tips.push(
            "Red soils benefit from regular addition of organic matter to improve water retention.",
          );
          tips.push(
            "Apply gypsum to reduce iron toxicity in highly acidic red soils.",
          );
          tips.push(
            "Consider deep tillage to break hardpan layers common in red soils.",
          );
          break;
        case "Black Soil":
          tips.push(
            "Black soils have excellent water retention but need good drainage to prevent waterlogging.",
          );
          tips.push(
            "Avoid over-irrigation as black soils can become sticky and difficult to work when too wet.",
          );
          tips.push(
            "Add sand or coarse organic matter to improve drainage in heavy black soils.",
          );
          break;
        case "Alluvial Soil":
          tips.push(
            "Alluvial soils are naturally fertile but benefit from regular addition of compost to maintain organic content.",
          );
          tips.push(
            "Monitor nitrogen levels as alluvial soils can sometimes be deficient.",
          );
          tips.push(
            "Implement crop rotation to prevent nutrient depletion in these productive soils.",
          );
          break;
        case "Sandy Soil":
          tips.push(
            "Sandy soils require frequent application of organic matter to improve water retention.",
          );
          tips.push(
            "Use mulching extensively to reduce water evaporation from sandy soils.",
          );
          tips.push(
            "Consider adding clay or biochar to improve nutrient retention capacity.",
          );
          break;
      }
    }
  
    // Region-specific soil tips
    if (region) {
      switch (region) {
        case "Chennai":
          tips.push(
            "Chennai's coastal soils may have salinity issues. Leach with fresh water before planting.",
          );
          break;
        case "Coimbatore":
          tips.push(
            "In Coimbatore, focus on water conservation techniques like mulching and drip irrigation.",
          );
          break;
        case "Madurai":
          tips.push(
            "Madurai's soils benefit from additional organic matter to improve water retention during hot months.",
          );
          break;
        case "Salem":
          tips.push(
            "In hilly areas of Salem, implement contour farming to prevent soil erosion.",
          );
          break;
        case "Trichy":
          tips.push(
            "Trichy's soils may need additional potassium for better crop resilience.",
          );
          break;
        case "Thanjavur":
          tips.push(
            "Maintain the natural fertility of Thanjavur's delta soils with green manuring practices.",
          );
          break;
        case "Erode":
          tips.push(
            "In Erode, incorporate drought-resistant farming practices like deep tillage and mulching.",
          );
          break;
        case "Tirunelveli":
          tips.push(
            "Tirunelveli's varied soil types require specific amendments based on local conditions.",
          );
          break;
      }
    }
  
    // Crop-specific soil tips
    if (cropType) {
      if (
        cropType.toLowerCase().includes("vegetable") ||
        cropType.toLowerCase() === "vegetables"
      ) {
        tips.push(
          "Most vegetables prefer well-draining soil with high organic content. Add compost regularly.",
        );
        tips.push(
          "Raised beds work well for vegetables in areas with poor drainage.",
        );
      } else if (
        cropType.toLowerCase().includes("fruit") ||
        cropType.toLowerCase() === "fruits"
      ) {
        tips.push(
          "Fruit trees generally need deeper soil preparation before planting. Dig wider holes and amend soil thoroughly.",
        );
        tips.push(
          "Apply a balanced organic fertilizer in early spring for fruit trees.",
        );
      } else if (
        cropType.toLowerCase().includes("grain") ||
        cropType.toLowerCase() === "grains"
      ) {
        tips.push(
          "Grains generally require less organic matter but benefit from proper mineral balance.",
        );
        tips.push("Focus on nitrogen management for optimal grain production.");
      } else if (
        cropType.toLowerCase().includes("paddy") ||
        cropType.toLowerCase().includes("rice")
      ) {
        tips.push(
          "Puddle the soil properly to reduce water percolation in paddy fields.",
        );
        tips.push(
          "Incorporate rice straw after harvest to improve soil organic matter.",
        );
      } else if (cropType.toLowerCase().includes("tomato")) {
        tips.push(
          "Tomatoes prefer slightly acidic soil (pH 6.0-6.8). Adjust with sulfur if needed.",
        );
        tips.push("Add calcium to prevent blossom end rot in tomatoes.");
      } else if (cropType.toLowerCase().includes("cotton")) {
        tips.push("Cotton prefers well-draining soil with pH between 5.8-8.0.");
        tips.push("Deep tillage helps cotton develop strong root systems.");
      }
    }
  
    return tips;
  }
  
  function generatePestTips(region, cropType, season) {
    const tips = [];
  
    // Base tips that apply to all
    tips.push(
      "Regularly inspect plants for signs of pest damage or disease symptoms.",
    );
    tips.push("Implement crop rotation to break pest and disease cycles.");
    tips.push(
      "Encourage beneficial insects by planting flowering herbs and native plants nearby.",
    );
  
    // Region-specific pest tips
    if (region) {
      switch (region) {
        case "Chennai":
          tips.push(
            "In Chennai's humid climate, watch for fungal diseases. Ensure good air circulation between plants.",
          );
          tips.push(
            "Neem oil applications work well for controlling common pests in this region.",
          );
          break;
        case "Coimbatore":
          tips.push(
            "Coimbatore farmers should monitor for thrips and mites during dry periods.",
          );
          tips.push(
            "Use pheromone traps to monitor pest populations specific to this region.",
          );
          break;
        case "Madurai":
          tips.push(
            "In Madurai, early detection of stem borers is crucial. Check plants regularly.",
          );
          tips.push(
            "Yellow sticky traps help control whiteflies common in this area.",
          );
          break;
        case "Salem":
          tips.push(
            "Salem's diverse elevation creates varied pest pressures. Adapt strategies to your specific location.",
          );
          tips.push("Implement border crops to divert pests from main crops.");
          break;
        case "Trichy":
          tips.push(
            "In Trichy, monitor for rice pests like brown planthoppers if growing paddy.",
          );
          tips.push(
            "Use light traps to monitor and reduce night-flying pest populations.",
          );
          break;
        case "Thanjavur":
          tips.push(
            "Thanjavur's delta region may experience higher pest pressure. Regular monitoring is essential.",
          );
          tips.push(
            "Consider biological controls like Trichogramma for managing rice stem borers.",
          );
          break;
        case "Erode":
          tips.push("In Erode, watch for red spider mites during dry periods.");
          tips.push("Implement trap crops to manage pod borers in pulse crops.");
          break;
        case "Tirunelveli":
          tips.push(
            "Tirunelveli farmers should monitor for fruit flies in fruit crops.",
          );
          tips.push(
            "Use botanical pesticides like neem and garlic extracts for common pests.",
          );
          break;
      }
    }
  
    // Crop-specific pest tips
    if (cropType) {
      if (
        cropType.toLowerCase().includes("vegetable") ||
        cropType.toLowerCase() === "vegetables"
      ) {
        tips.push(
          "For leafy vegetables, row covers can prevent leaf miners and other flying pests.",
        );
        tips.push(
          "Companion plant with strong-smelling herbs like basil and cilantro to deter vegetable pests.",
        );
      } else if (
        cropType.toLowerCase().includes("fruit") ||
        cropType.toLowerCase() === "fruits"
      ) {
        tips.push(
          "Fruit fly traps using fermented fruit bait can reduce damage to ripening fruits.",
        );
        tips.push(
          "Bag developing fruits with paper or cloth bags to prevent fruit fly and bird damage.",
        );
      } else if (
        cropType.toLowerCase().includes("grain") ||
        cropType.toLowerCase() === "grains"
      ) {
        tips.push(
          "Monitor for storage pests by regularly checking stored grains.",
        );
        tips.push("Use neem-coated urea to reduce pest pressure in grain crops.");
      } else if (
        cropType.toLowerCase().includes("paddy") ||
        cropType.toLowerCase().includes("rice")
      ) {
        tips.push(
          "Alternate wetting and drying can help manage certain rice pests.",
        );
        tips.push(
          "Release Trichogramma cards at appropriate intervals to control stem borers.",
        );
      } else if (cropType.toLowerCase().includes("tomato")) {
        tips.push(
          "Monitor for tomato hornworms by checking the underside of leaves regularly.",
        );
        tips.push(
          "Use Bacillus thuringiensis (Bt) for caterpillar control in tomatoes.",
        );
      } else if (cropType.toLowerCase().includes("cotton")) {
        tips.push(
          "Implement integrated pest management specifically designed for cotton bollworms.",
        );
        tips.push("Consider trap crops like okra to divert pests from cotton.");
      }
    }
  
    // Season-specific pest tips
    if (season) {
      switch (season) {
        case "Kharif":
          tips.push(
            "During Kharif season, increased humidity can lead to fungal diseases. Ensure proper spacing and air circulation.",
          );
          tips.push("Monitor for increased pest activity after heavy rains.");
          break;
        case "Rabi":
          tips.push(
            "In Rabi season, aphids can be problematic. Use yellow sticky traps for monitoring.",
          );
          tips.push(
            "Watch for soil-borne diseases that may emerge in cooler temperatures.",
          );
          break;
        case "Summer":
          tips.push(
            "Summer heat increases mite populations. Regular water sprays can help control them.",
          );
          tips.push("Monitor for thrips which thrive in hot, dry conditions.");
          break;
      }
    }
  
    return tips;
  }
  
  function generateWaterTips(region, cropType, season, soil) {
    const tips = [];
  
    // Base tips that apply to all
    tips.push("Water deeply and less frequently to encourage deep root growth.");
    tips.push(
      "Apply water at the base of plants to minimize leaf wetness and disease.",
    );
  
    // Region-specific water tips
    if (region) {
      switch (region) {
        case "Chennai":
          tips.push(
            "In Chennai, harvest rainwater during monsoons to use during dry periods.",
          );
          tips.push(
            "Consider drip irrigation to maximize water efficiency in this water-scarce region.",
          );
          break;
        case "Coimbatore":
          tips.push(
            "Coimbatore's varied rainfall requires flexible irrigation planning. Monitor soil moisture regularly.",
          );
          tips.push(
            "Implement micro-irrigation techniques for efficient water use.",
          );
          break;
        case "Madurai":
          tips.push(
            "In Madurai's hot climate, early morning or evening watering reduces evaporation losses.",
          );
          tips.push(
            "Consider sub-surface irrigation for high-value crops to minimize water loss.",
          );
          break;
        case "Salem":
          tips.push(
            "In hilly areas of Salem, contour trenches help capture rainwater for crops.",
          );
          tips.push(
            "Implement keyline water management for optimal water distribution across slopes.",
          );
          break;
        case "Trichy":
          tips.push(
            "In Trichy, focus on water conservation during the dry months through mulching and proper timing.",
          );
          tips.push(
            "Consider partial root zone drying techniques for tree crops.",
          );
          break;
        case "Thanjavur":
          tips.push(
            "Thanjavur's delta region may have access to canal irrigation. Schedule according to release timings.",
          );
          tips.push(
            "Implement alternate wetting and drying for rice to save water while maintaining yields.",
          );
          break;
        case "Erode":
          tips.push(
            "In Erode, focus on water harvesting techniques to capture seasonal rainfall.",
          );
          tips.push(
            "Drip irrigation with mulching provides excellent water efficiency in this region.",
          );
          break;
        case "Tirunelveli":
          tips.push(
            "Tirunelveli farmers can implement check dams and farm ponds to capture seasonal water.",
          );
          tips.push(
            "Consider drought-resistant farming practices during dry periods.",
          );
          break;
      }
    }
  
    // Soil-specific water tips
    if (soil) {
      switch (soil) {
        case "Red Soil":
          tips.push(
            "Red soils drain quickly. Water more frequently but in smaller amounts.",
          );
          tips.push("Heavy mulching helps retain moisture in red soils.");
          break;
        case "Black Soil":
          tips.push(
            "Black soils retain water well. Avoid overwatering to prevent waterlogging.",
          );
          tips.push(
            "Create proper drainage channels to prevent water stagnation during heavy rains.",
          );
          break;
        case "Alluvial Soil":
          tips.push(
            "Alluvial soils have good water-holding capacity. Moderate, regular watering works well.",
          );
          tips.push(
            "Monitor soil moisture at different depths to optimize irrigation scheduling.",
          );
          break;
        case "Sandy Soil":
          tips.push(
            "Sandy soils need frequent, light watering as they drain very quickly.",
          );
          tips.push(
            "Consider installing drip irrigation with frequent cycles for sandy soils.",
          );
          break;
      }
    }
  
    // Crop-specific water tips
    if (cropType) {
      if (
        cropType.toLowerCase().includes("vegetable") ||
        cropType.toLowerCase() === "vegetables"
      ) {
        tips.push(
          "Most vegetables need consistent moisture. Use drip irrigation or soaker hoses for efficiency.",
        );
        tips.push(
          "Critical watering periods for vegetables are during flowering and fruit development.",
        );
      } else if (
        cropType.toLowerCase().includes("fruit") ||
        cropType.toLowerCase() === "fruits"
      ) {
        tips.push(
          "Fruit trees need deep watering to encourage deep root systems.",
        );
        tips.push(
          "Reduce watering before harvest to improve fruit flavor and reduce cracking.",
        );
      } else if (
        cropType.toLowerCase().includes("grain") ||
        cropType.toLowerCase() === "grains"
      ) {
        tips.push(
          "Grains are most sensitive to water stress during flowering and grain filling stages.",
        );
        tips.push(
          "Consider deficit irrigation strategies during less critical growth stages.",
        );
      } else if (
        cropType.toLowerCase().includes("paddy") ||
        cropType.toLowerCase().includes("rice")
      ) {
        tips.push(
          "Implement alternate wetting and drying to save water while maintaining yields.",
        );
        tips.push("Maintain 2-5 cm water level during critical growth stages.");
      } else if (cropType.toLowerCase().includes("tomato")) {
        tips.push(
          "Tomatoes need consistent moisture to prevent blossom end rot and fruit cracking.",
        );
        tips.push(
          "Reduce watering slightly when fruits begin to ripen for better flavor.",
        );
      } else if (cropType.toLowerCase().includes("cotton")) {
        tips.push(
          "Cotton is drought-tolerant but needs adequate moisture during boll development.",
        );
        tips.push(
          "Implement deficit irrigation during vegetative growth to encourage deeper rooting.",
        );
      }
    }
  
    // Season-specific water tips
    if (season) {
      switch (season) {
        case "Kharif":
          tips.push(
            "During Kharif, focus on proper drainage to prevent waterlogging during heavy rains.",
          );
          tips.push(
            "Have supplemental irrigation ready for dry spells between monsoon rains.",
          );
          break;
        case "Rabi":
          tips.push(
            "Rabi crops often rely on residual soil moisture. Conserve it through mulching.",
          );
          tips.push(
            "Schedule irrigation based on critical growth stages as water may be limited.",
          );
          break;
        case "Summer":
          tips.push(
            "Summer crops need more frequent irrigation. Water early morning or late evening to reduce evaporation.",
          );
          tips.push(
            "Consider shade cloth or temporary structures to reduce evapotranspiration during peak summer.",
          );
          break;
      }
    }
  
    return tips;
  }
  
  function generateHarvestTips(cropType, season) {
    const tips = [];
  
    // Base tips that apply to all
    tips.push(
      "Harvest during the cooler parts of the day to reduce stress on both plants and produce.",
    );
    tips.push(
      "Use clean, sharp tools to minimize damage and disease entry points.",
    );
  
    // Crop-specific harvest tips
    if (cropType) {
      if (
        cropType.toLowerCase().includes("vegetable") ||
        cropType.toLowerCase() === "vegetables"
      ) {
        tips.push(
          "Harvest leafy greens by cutting outer leaves first, allowing the plant to continue producing.",
        );
        tips.push(
          "Pick vegetables when they reach optimal size but before they become overripe or tough.",
        );
        tips.push(
          "Regular harvesting encourages continued production in many vegetables.",
        );
      } else if (
        cropType.toLowerCase().includes("fruit") ||
        cropType.toLowerCase() === "fruits"
      ) {
        tips.push(
          "Harvest fruits when they reach full color but are still firm for better shelf life.",
        );
        tips.push(
          "Use the twist and pull method rather than yanking to prevent stem damage.",
        );
        tips.push(
          "Handle fruits carefully to avoid bruising which leads to faster spoilage.",
        );
      } else if (
        cropType.toLowerCase().includes("grain") ||
        cropType.toLowerCase() === "grains"
      ) {
        tips.push(
          "Harvest grains when moisture content is around 14-16% for optimal storage.",
        );
        tips.push(
          "Ensure proper drying before storage to prevent mold and pest issues.",
        );
        tips.push(
          "Clean harvesting equipment thoroughly to prevent contamination between fields.",
        );
      } else if (
        cropType.toLowerCase().includes("paddy") ||
        cropType.toLowerCase().includes("rice")
      ) {
        tips.push("Harvest paddy when 80-85% of the grains turn golden yellow.");
        tips.push("Dry harvested paddy to 14% moisture content before storage.");
        tips.push(
          "Thresh carefully to minimize broken grains which reduce market value.",
        );
      } else if (cropType.toLowerCase().includes("tomato")) {
        tips.push(
          "Harvest tomatoes when they show full color but are still firm for better flavor and shelf life.",
        );
        tips.push(
          "Pick with the stem attached to extend shelf life and prevent disease entry.",
        );
        tips.push(
          "Green tomatoes can be ripened indoors at the end of the season.",
        );
      } else if (cropType.toLowerCase().includes("cotton")) {
        tips.push(
          "Harvest cotton when 50-60% of bolls are open for optimal quality.",
        );
        tips.push(
          "Pick during dry weather to prevent discoloration and quality loss.",
        );
        tips.push("Ensure proper cleaning and grading for better market prices.");
      }
    }
  
    // Season-specific harvest tips
    if (season) {
      switch (season) {
        case "Kharif":
          tips.push(
            "For Kharif crops, be prepared to harvest quickly if heavy rains are forecast.",
          );
          tips.push(
            "Have proper drying facilities ready as harvest often coincides with humid conditions.",
          );
          break;
        case "Rabi":
          tips.push(
            "Rabi crop harvest often coincides with rising temperatures. Harvest early in the day.",
          );
          tips.push(
            "Take advantage of dry conditions for natural field drying when appropriate.",
          );
          break;
        case "Summer":
          tips.push(
            "Summer harvests should be done very early morning to avoid heat damage to produce.",
          );
          tips.push(
            "Move harvested produce to shade or cold storage quickly to maintain quality.",
          );
          break;
      }
    }
  
    return tips;
  }
  