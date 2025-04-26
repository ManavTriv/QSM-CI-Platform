const metricDescriptions = {
    "Elo": "An ELO-style ranking score derived from community-based pairwise comparisons of susceptibility maps. Higher scores reflect better perceived quality.",
    "RMSE": "Root Mean Squared Error between the reconstructed susceptibility map and the ground truth. Lower values indicate better overall accuracy.",
    "NRMSE": "Normalized Root Mean Squared Error, adjusting RMSE relative to the magnitude of the ground truth. Useful for comparing across different scales.",
    "HFEN": "High Frequency Error Norm. Captures differences in fine structural details between reconstruction and ground truth, emphasizing sharpness and edge preservation.",
    "MAD": "Mean Absolute Difference between the reconstructed and true susceptibility values. A lower MAD indicates better reconstruction fidelity.",
    "XSIM": "Extended Structural SIMilarity index. Measures structural similarity, tuned for QSM to evaluate perceptual quality of reconstructions.",
    "CC1": "Pearson Correlation Coefficient between the reconstructed and ground truth susceptibility values within the brain mask.",
    "CC2": "Pearson Correlation Coefficient focusing on susceptibility variations within regions of interest (ROIs), complementing CC1.",
    "NMI": "Normalized Mutual Information between the reconstruction and ground truth, quantifying shared information independent of intensity scaling.",
    "GXE": "Gradient-domain RMSE (GXE). Measures RMSE of the spatial gradients between reconstructed and ground truth maps, emphasizing preservation of fine gradient features.",
  };
  
  export default metricDescriptions;
  